# Backend-Material 프로젝트
`backend-material`는 예비 개발자들이 기본적인 백엔드 기능들을 빠르고 효과적으로 구축할 수 있도록 도와주는 프로젝트입니다. 회원가입, 로그인, 인증, 결제 등의 기본적인 기능을 바닥부터 구현하는 데 드는 시간과 노력을 줄이고, 실력 향상에 집중할 수 있도록 하기 위해 만들어졌습니다.

## payment 서비스

결제를 담당하는 모듈. 주문 금액 계산, 할인 적용, 주문 생성 등의 기능을 제공합니다.


## 디렉토리 구조

```
src/payment
├── payment.module.ts
├── controllers
│   ├── payment.controller.ts
│   └── index.ts
├── dto
│   └── create-order.dto.ts
├── entities
│   ├── coupon.entity.ts
│   ├── index.ts
│   ├── issued-coupone.entity.ts
│   ├── order-item.entity.ts
│   ├── order.entity.ts
│   ├── point-log.entity.ts
│   ├── point.entity.ts
│   ├── product.entity.ts
│   └── shipping-info.entity.ts
├── repositories
│   ├── coupon.repository.ts
│   ├── index.ts
│   ├── issued-coupone.repository.ts
│   ├── order-item.repository.ts
│   ├── order.repository.ts
│   ├── point-log.repository.ts
│   ├── point.repository.ts
│   ├── product.repository.ts
│   └── shipping-info.repository.ts
└── services
    ├── index.ts
    ├── payment.service.ts
    └── product.service.ts
```
