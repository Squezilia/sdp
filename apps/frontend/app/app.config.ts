import { LaptopMinimal, LayoutDashboard, Settings } from 'lucide-vue-next';

export default defineAppConfig({
  navigation: {
    'Ana Sayfa': '/',
    Hizmetler: {
      VDS: {
        path: '/services/vds',
        icon: 'solar:laptop-minimalistic-bold',
        description: 'Performanslı size özel sanal sunucular.',
        style: 'from-violet-500/20 to-violet-500/0',
      },
      VPS: {
        path: '/services/vps',
        icon: 'solar:laptop-minimalistic-bold',
        description: 'Performanslı paylaşımlı sanal sunucular.',
        style: 'from-violet-500/20 to-violet-500/0',
      },
      Dedicated: {
        path: '/services/dedicated',
        icon: 'solar:server-square-bold',
        description: 'Sanallaştırma olmadan saf donanıma sahip sunucular.',
        wide: true,
        style: 'col-span-2 from-amber-500/20 to-amber-500/0',
      },
    },
    Yardım: {
      Dokumentasyon: {
        path: '/help/docs',
        icon: 'solar:book-2-bold',
        description: 'Sistemlerimiz hakkındaki el kitapçığı.',
        style: 'from-emerald-500/20 to-emerald-500/0',
      },
      İletişim: {
        path: '/help/contact',
        icon: 'solar:help-bold',
        description: 'Çözülemeyen sorunlarınız için yardım masamız.',
        style: 'from-emerald-500/20 to-emerald-500/0',
      },
    },
  },
  sidebar: {
    Platform: {
      'Ana Sayfa': {
        icon: LayoutDashboard,
        route: '/dash',
      },
      Ayarlar: {
        icon: Settings,
        route: '/dash/settings',
      },
    },
    Kaynaklar: {
      'Sanal Makineler': {
        icon: LaptopMinimal,
        route: '/dash/vm',
      },
    },
  },
  emailRegex:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  passwordRegex:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/,
  nameRegex: /^[a-z ,.'-]+$/i,
});
