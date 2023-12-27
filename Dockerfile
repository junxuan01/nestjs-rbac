# 使用 Node.js 18 作为基础镜像
FROM node:18-alpine as build-stage
# 安装 pnpm
RUN #npm install -g pnpm
RUN corepack enable
# 设置安装镜像
RUN npm config set registry https://registry.npmmirror.com/

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml（如果存在）
COPY package*.json pnpm-lock.yaml ./
# 安装项目依赖
RUN pnpm install --no-frozen-lockfile
COPY . .

# 构建项目
RUN npm run build

# 暴露应用程序的端口（根据您的 NestJS 项目配置进行调整）
EXPOSE 3000

# 使用 PM2 启动应用程序
#CMD ["pm2-runtime", "dist/main.js"]
CMD ["node","/app/dist/src/main.js"]
