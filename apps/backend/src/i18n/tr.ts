import type Language from '.';

export default {
  error: {
    organization: {
      insufficentPermission: {
        error: 'Yetersiz Yetki',
        reason: 'Bu eylemi gerçekleştirebilmek için yetkiniz bulunmamaktadır.',
      },
    },
  },
} satisfies Language;
