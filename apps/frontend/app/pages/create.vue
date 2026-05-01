<script setup lang="ts">
import { authClient } from '~/lib/auth';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, Field as VeeField } from 'vee-validate';
import * as z from 'zod';
import { FieldError } from '@/components/ui/field';
import useToast from '@/composables/useToast';
import { Edit2, FileSearchCorner, Image } from 'lucide-vue-next';
import { Badge } from '~/components/ui/badge';
import { watchDebounced } from '@vueuse/core';
import kebabCase from 'just-kebab-case';

definePageMeta({
  middleware: ['auth'],
});

const formSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    name: '',
    slug: '',
  },
  validateOnMount: false,
});

const onSubmit = handleSubmit((values) => {
  authClient.organization.create({
    name: values.name,
    slug: values.slug,
    fetchOptions: {
      onError(context) {
        useToast(context.error.name, {
          description: context.error.message,
          type: 'error',
        });
      },
      onSuccess() {
        navigateTo('/dash');
        useToast('Organizasyon oluşturuldu!', { type: 'success' });
      },
    },
  });
});

function randomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

watchDebounced(
  () => values.name,
  async (newVal) => {
    let slug: string;
    if (!newVal || newVal.length < 3) {
      slug = kebabCase(`my-organization-${randomInt(10_000, 100_000)}`);
    } else {
      slug = kebabCase(newVal);
    }

    const res = await authClient.organization.checkSlug({
      slug,
    });

    if (res.error) {
      setFieldValue(
        'slug',
        newVal && newVal.length >= 3
          ? kebabCase(`${newVal}-${randomInt(10_000, 100_000)}`)
          : kebabCase(`my-organization-${randomInt(10_000, 100_000)}`)
      );
      return;
    }
    setFieldValue('slug', slug);
  },
  {
    debounce: 500,
    maxWait: 1000,
  }
);
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <section
      class="xl:w-4xl flex items-center p-2.5 justify-center relative overflow-hidden rounded-2xl xl:min-h-105"
    >
      <NuxtImg
        src="/mesh_bg-2.jpg"
        class="absolute top-0 left-0 h-full w-full select-none pointer-events-none"
      />

      <form
        class="w-full h-full xl:w-3xl p-4 flex bg-background rounded-xl relative flex-col gap-6"
        @submit="onSubmit"
      >
        <div class="z-10 rounded-xl flex flex-col w-fit">
          <Heading> Yeni Organizasyon </Heading>
          <p class="text-sm text-muted-foreground text-pretty">
            Her şeye başlamadan önce organizasyonunuza bir kimlik kazandıralım.
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-4">
          <div
            class="z-10 border p-2.5 rounded-xl justify-start flex flex-col w-full max-w-none lg:max-w-75"
          >
            <FieldSet>
              <FieldGroup class="gap-3">
                <VeeField v-slot="{ field, errors }" name="name">
                  <Field>
                    <FieldLabel for="name"> Organizasyon Adı </FieldLabel>
                    <Input
                      id="name"
                      v-bind="field"
                      tabindex="1"
                      type="text"
                      placeholder="Acme Inc."
                      required
                    />
                    <FieldError v-if="errors.length" :errors="errors" />
                  </Field>
                </VeeField>

                <VeeField v-slot="{ field, errors, value }" name="slug">
                  <Field class="w-fit">
                    <Popover>
                      <PopoverTrigger as-child>
                        <Badge> <Edit2 /> {{ value || 'acme-inc' }} </Badge>
                      </PopoverTrigger>
                      <PopoverContent>
                        <FieldLabel for="slug"> Benzersiz ID </FieldLabel>
                        <Input
                          id="slug"
                          v-bind="field"
                          tabindex="2"
                          type="text"
                          placeholder="acme-inc"
                          required
                        />
                        <FieldError v-if="errors.length" :errors="errors" />
                      </PopoverContent>
                    </Popover>
                  </Field>
                </VeeField>
              </FieldGroup>
            </FieldSet>
          </div>

          <div
            class="z-10 border p-2.5 gap-2.5 rounded-xl justify-start flex w-full"
          >
            <div
              class="size-24 flex items-center justify-center shrink-0 border-2 border-dashed border-muted-foreground rounded-lg"
            >
              <Image class="size-6 text-muted-foreground" />
            </div>
            <div class="space-y-1.5">
              <Label> Organizasyon Logosu </Label>
              <p class="text-sm text-muted-foreground text-pretty">
                Maksimum 1024x1024 (1.5 MB) boyutlarında 1:1 oranında
                (.png|.jpg|.jpeg|.webp)
              </p>
              <Button size="sm" variant="outline">
                <FileSearchCorner />
                Dosya Seç
              </Button>
            </div>
          </div>
        </div>

        <div class="z-10 rounded-xl flex flex-col w-fit ml-auto">
          <Button tabindex="3" class="group/arrow-parent min-w-32 ml-auto">
            Devam Et <ArrowRight />
          </Button>
        </div>
      </form>

      <!-- <form
        ref="FormElement"
        class="col-span-5 p-4 space-y-4 bg-background border z-10 rounded-xl h-min my-auto"
      >
        <div>
          <SubHeading class="font-extrabold font-display"
            >Yeni Organizasyon</SubHeading
          >
        </div>
        <FieldSet>
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="name">
              <Field>
                <FieldLabel for="name"> Organizasyon Adı </FieldLabel>
                <Input
                  id="name"
                  v-bind="field"
                  tabindex="1"
                  type="text"
                  placeholder="Acme Inc."
                  required
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ field, errors }" name="slug">
              <Field>
                <FieldLabel for="slug"> Benzersiz ID </FieldLabel>
                <Input
                  id="slug"
                  v-bind="field"
                  tabindex="2"
                  type="text"
                  placeholder="acme-inc"
                  required
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
        </FieldSet>
        <Button tabindex="3" class="group/arrow-parent min-w-32 ml-auto">
          Devam Et <ArrowRight />
        </Button>
      </form> -->
    </section>
  </div>
</template>
