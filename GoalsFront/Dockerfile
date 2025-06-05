
# 1. Aşama: Angular kodunu build alalım
FROM node:20 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
# production konfigürasyonu ile build:
RUN npm run build -- --configuration=production

# 2. Aşama: Nginx içine kopyalayıp, proxy ayarlarını koyacağız
FROM nginx:stable-alpine

# 1. aşamada oluşturulan dist klasörünü Nginx webroot'a kopyala
COPY --from=builder /app/dist/goals-front/browser /usr/share/nginx/html

# Kendi nginx.conf dosyamızı override edelim
# (Önce bu dosyayı projede: GoalsFront/nginx.conf olarak oluşturmalısınız)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# (İsterseniz HTTP yerine HTTPS ayarları, gzip, cache başlığı vb. ekleme yapılabilir.)

# Varsayılan olarak 80 portunu expose eder
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
