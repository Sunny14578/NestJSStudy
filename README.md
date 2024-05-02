# Backend-Material 프로젝트


## payment 서비스

결제를 담당하는 모듈. 주문 금액 계산, 할인 적용, 주문 생성 등의 기능을 제공합니다.


## 디렉토리 구조

```
src/payment
├── auth.module.ts
├── controllers
│   ├── auth.controller.ts
│   └── index.ts
├── dto
│   ├── index.ts
│   └── login-res.dto.ts
├── entities
│   ├── access-log.entity.ts
│   ├── access-token.entity.ts
│   ├── index.ts
│   ├── refresh-token.entity.ts
│   ├── token-blacklist.entity.ts
│   └── user.entity.ts
├── repositories
│   ├── access-log.repository.ts
│   ├── access-token.repository.ts
│   ├── index.ts
│   ├── refresh-token.repository.ts
│   ├── token-blacklist.repository.ts
│   └── user.repository.ts
└── services
    ├── auth.service.ts
    ├── index.ts
    ├── token-blacklist.service.ts
    └── user.service.ts
```
