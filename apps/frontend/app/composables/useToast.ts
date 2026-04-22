import type { ExternalToast } from 'vue-sonner';
import { toast } from 'vue-sonner';

export default async function useToast(
  title: string,
  options?: ExternalToast & { type?: 'error' | 'info' | 'success' }
) {
  switch (options?.type) {
    case 'error':
      return toast.error(title, options);

    case 'success':
      return toast.success(title, options);

    default:
      return toast.info(title, options);
  }
}
