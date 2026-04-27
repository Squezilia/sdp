# SDP - Simple Development Project

Bu projenin asıl amacı oldukça basit bir `commercial use` hosting sitesi oluşturmak. Bu projeyi geliştirirkenki hedeflerim ise;

- Kullanıcıyı aşırı basit ve birbirinin aynısı `WHMCS` arayüzlerinden kurtarıp gerçekten cloud kullanıyormuş gibi hissettirmek
- Infastructure yönetimini, araçlarını ve konseptlerini öğrenmek (Proxmox, HA, Corosync, Ceph)
- Microservices konseptini kısmen kullanmak ve Zero Trust mimarisini öğrenmek
- gRPC ve Protobuffers öğrenmek

SDP yapısal olarak karmaşık değildir; `Backend`, `Frontend` ve `IMS` yapılarından oluşur.

## Backend

Backend, SDP'nin uygulama işlemlerini yaptığı yerdir. Kullanıcı, Organizasyon, Ödeme, Ürün yönetimi ve Admin işlemleri gibi kullanıcı ve sistem yöneticisinin yapacağı işlemler Backend'de bulunur.

Backend 4 servisden oluşur ve bunlar; `Auth`, `Infastructure`, `Payment` ve `Resource` servisleridir. 80/443 portunda çalışan bir HTTP(s) sunucusudur ve [Bun runtime](https://bun.com/) üzerinde `Elysia` frameworkünü kullanarak çalışır.

[Elysia](https://elysiajs.com/) frameworkünün doğası gereği tamamen type-safe olup geliştirme süreci için `/swagger` noktası altında `Scalar` arayüzlü Swagger Dokümentasyonuna sahiptir.

`Auth` servisinde [better-auth](https://better-auth.com/) frameworkünü [organization](https://better-auth.com/docs/plugins/organization), [username](https://better-auth.com/docs/plugins/username), [admin](https://better-auth.com/docs/plugins/admin) pluginleriyle birlikte `Google` ve `GitHub` SSO ayarlarıyla kullanır.

`Infastructure` servisinde `IMS` yapısına dayanır. Platform düzeyinde işlemleri gerçekleştirmek için `IMS` ile `gRPC` üzerinden konuşur. Bu konuşma arasındaki güvenlik ise `mTLS` ile sağlanır.

`Payment` servisinde Backend [PayTR](https://dev.paytr.com/en) veya [İyzico](https://docs.iyzico.com/) üzerinden ödemeleri gerçekleştirir.

`Resources` servisinde kullanıcının sahip olduğu kaynaklar bulunur. Bunlar; ISO kurulum imajları veya qcow2/img formatında disk imajları olabilir. Bu servisde kullanıcıya belirbir bir alan terhis edilir lakin bu alan kiralanan hizmet karşılığında terhis edilmektedir.

## Frontend

Frontend ise sadece Backend ile iletişime geçmek için vardır. [shadcn-vue](https://www.shadcn-vue.com/) arayüz kütüphanesi kullanılarak [nuxt](https://nuxt.com/) üzerinde geliştirilmiştir.

> [!WARNING]
> Deployment sırasında Backend ile Frontend'in aynı domain altında olduğundan emin olun.

## IMS (Infastructure Management System)

IMS'in en temel amacı; Birden fazla clusterın yönetiminin tek bir çatı altında birleştirilmesi ve kullanıcı işlemlerinin fazla detaya gerek duymadan bu clusterlar üzerinde gerçekleştirilmesidir.

IMS tek başına ayrı bir node üzerinde single process/single threaded çalışmak üzere tasarlanmıştır. Bunun sebebi IMS'in aktif çalışan bir servis olması, diğer servisler veya izlediği clusterlardan etkilenmemesi gerekmektedir.

---

## Kurulum

Sistemin bütünü bazı paketlerin indirilmesine ihtiyaç duyar. Sisteminizde şu paketlerin ve sunucuların kurulu veya erişilebilir olduğunuzdan emin olunuz;

- [Bun](https://bun.sh/) (>= 1.3.11)
- [Postgresql](https://www.postgresql.org/download/) (>= 18.3)
- [Redis](https://redis.io/downloads/) (>= 8.0) veya [Valkey](https://valkey.io/download/) (>= 9.0)
- [TPM2-TSS](https://github.com/tpm2-software/tpm2-tss) (>= 4.1.3)

> [!NOTE]
> `.env.example` dosyasını `.env` olarak yeniden adlandırıp içindeki değişkenleri kendi ortamınıza göre ayarlamanız gerekmektedir.

```bash
# Run in project root
bun install

# Prepare Prisma
bun run databases:generate
bun run databases:push

# Prepare Protocol Buffers
bun run proto:generate
```

### TPM2-TSS

Sisteminizde genel olarak `libtss2-fapi.[so|dll|dylib]` dosyasının bulunması yeterli. Eğer sisteminize kütüphane bu dosya adı yerine farklı bir adla veya sistem kütüphanelerinin bulunmadığı bir adreste bulunuyorsa `IMS_TSS2_FAPI_LIB` ortam değişkenini kullanarak kütüphanenin konumunu belirtebilirsiniz.

Eğer TPM2 modülünüz bulunmuyor, arızalı veya simüle etmek istiyorsanız `IMS_TSS2_TCTI` ortam değişkenini ayarlayarak `swtpm` veya benzeri yazılımlar sayesinde TPM 2.0 sanallaştırması yapabilirsiniz.

Sistem bazında indirmeler için aşağıdaki yöntemleri kendi sisteminize göre deneyebilirsiniz;

#### Windows / MacOS

`libtss2-fapi` doğrudan Linux donanım/çekirdek özelliklerine ve TPM 2.0 stack'ine dayanmaktadır. Windows ve macOS üzerinde native bir kurulum karmaşık ve kararsız olabileceği için;

- Windows kullanıcılarının WSL2 (Ubuntu/Debian) üzerinden,
- macOS kullanıcılarının ise Docker (Linux tabanlı) veya bir Linux VM üzerinden kurulum yapmaları en doğru ve stabil yöntem olacaktır.

#### Debian/Ubuntu

```bash
sudo apt update
sudo apt install libtss2-fapi1
```

#### RHEL (CentOS, Alma Linux, Rocky Linux)

```bash
sudo dnf install tpm2-tss
```

#### Arch (CachyOS, Endeavour)

```bash
sudo pacman -S tpm2-tss
```

#### Nix / NixOS

```bash
# Geçici kabuk için
nix-shell -p tpm2-tss

# Nix profile ile yüklemek için
nix-env -iA nixpkgs.tpm2-tss
```

---

### Mevcut Komutlar

```bash
  # Backend
  bun run backend:start        # Backend'i PRODUCTION modunda çalıştır
  bun run backend:dev          # Backend'i DEVELOPMENT modunda çalıştır
  bun run backend:build        # Bun Bundler kullanarak Backend'i PRODUCTION için derle

  # IMS
  bun run ims:start            # IMS'i PRODUCTION modunda çalıştır
  bun run ims:dev              # IMS'i DEVELOPMENT modunda çalıştır
  bun run ims:build            # Bun Bundler kullanarak IMS'i PRODUCTION için derle

  # Frontend
  bun run frontend:start       # Frontend'i PRODUCTION modunda çalıştır
  bun run frontend:dev         # Frontend'i DEVELOPMENT modunda çalıştır
  bun run frontend:build       # Frontend'i PRODUCTION için derle

  # Utilities
  bun run databases:generate   # Veritabanları için Prisma Clientleri oluştur
  bun run databases:push       # Prisma Schemalarını Veritabanlarına yükle
  bun run databases:pull       # Veritabanlarından Prisma Schemalarını indir
  bun run lint                 # Linter çalıştır (eslint)
  bun run proto:generate       # Protocol Buffers dosyalarını TypeScript için derle
```
