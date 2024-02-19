<p align="center" style="vertical-align:middle">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="200" alt="Nest Logo" /></a><br /><a href="https://supabase.com/" target="blank"><img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only" width="500" alt="Supabase"></a>
</p>

![Test](https://github.com/adrianmjim/nestjs-supabase-js/actions/workflows/codecov_test.yml/badge.svg)
[![codecov](https://codecov.io/gh/Adrianmjim/nestjs-supabase-js/graph/badge.svg?token=jNHEDepqm7)](https://codecov.io/gh/Adrianmjim/nestjs-supabase-js)
[![NPM Version](https://badge.fury.io/js/nestjs-supabase-js.svg?style=flat)](https://npmjs.org/package/nestjs-supabase-js)
[![NPM Download Stats](https://nodei.co/npm/nestjs-supabase-js.png?downloads=true)](https://www.npmjs.com/package/nestjs-supabase-js)

## Description

The [Supabase](https://github.com/supabase/supabase-js) module for [NestJS](https://github.com/nestjs/nest).

## Installation

Install the dependencies via `npm`, `pnpm` or `yarn`:

npm:
```bash
$ npm i -s @nestjs/common @supabase/supabase-js nestjs-supabase-js
```

pnpm:
```bash
$ pnpm add @nestjs/common @supabase/supabase-js nestjs-supabase-js
```

yarn:
```bash
$ yarn add @nestjs/common @supabase/supabase-js nestjs-supabase-js
```

## Configuration

First, import the module into your NestJS application and configure it using the configuration key provided by Supabase.

```typescript
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [
    SupabaseModule.forRoot({
      supabaseKey: 'YOUR_SUPABASE_KEY',
      supabaseUrl: 'YOUR_SUPABASE_URL',
    }),
  ],
})
export class AppModule {}
```

Or, You can configure it asynchronously as follows:

```typescript
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [
    SupabaseModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        supabaseKey: 'YOUR_SUPABASE_KEY',
        supabaseUrl: 'YOUR_SUPABASE_URL',
      }),
    }),
  ],
})
export class AppModule {}
```

## Multiple connections

In certain situations, we will need to connect to different Supabase projects, with this module this is possible:

```typescript
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [
    SupabaseModule.forRoot([
      {
        name: 'connection1',
        supabaseConfig: {
          supabaseKey: 'YOUR_SUPABASE_KEY',
          supabaseUrl: 'YOUR_SUPABASE_URL',
        },
      },
      {
        name: 'connection2',
        supabaseConfig: {
          supabaseKey: 'YOUR_SUPABASE_KEY',
          supabaseUrl: 'YOUR_SUPABASE_URL',
        },
      },
    ]),
  ],
})
export class AppModule {}
```

Or asynchronously:

```typescript
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [
    SupabaseModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ([
        {
          name: 'connection1',
          supabaseConfig: {
            supabaseKey: 'YOUR_SUPABASE_KEY',
            supabaseUrl: 'YOUR_SUPABASE_URL',
          },
        },
        {
          name: 'connection2',
          supabaseConfig: {
            supabaseKey: 'YOUR_SUPABASE_KEY',
            supabaseUrl: 'YOUR_SUPABASE_URL',
          },
        },
      ]),
    }),
  ],
})
export class AppModule {}
```

## Usage

First, inject the client into the module where you want to use it:

```typescript
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [
    SupabaseModule.injectClient(),
  ],
})
export class CatModule {}
```

Or, for a specific connection:

```typescript
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [
    SupabaseModule.injectClient('connection1', 'connection2'),
  ],
})
export class CatModule {}
```

Now you can use the Supabase client in any provider of your module:

```typescript
import { SupabaseClient } from '@supabase/supabase-js';

export class CatService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  public doSomething(): void {

  }
}
```

Or, for a specific connection:

```typescript
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from 'nestjs-supabase-js';

export class CatService {
  constructor(
    @InjectSupabaseClient('connection1') private readonly supabaseClient1: SupabaseClient,
    @InjectSupabaseClient('connection2') private readonly supabaseClient2: SupabaseClient,
  ) {}

  public doSomething(): void {

  }
}
```

It's also possible to use the InjectSupabaseClient decorator to inject the Supabase client when you don't want to explicitly type it with the client:

```typescript
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from 'nestjs-supabase-js';

export class CatService {
  constructor(
    @InjectSupabaseClient() private readonly supabaseClient: unknown,
  ) {}

  public doSomething(): void {

  }
}
```

## 🤝 Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/adrianmjim/nestjs-supabase-js/issues)

Contributions, issues and feature requests are welcome.

## Authors

👤 **Adrián Martínez Jiménez**

- Github: [@adrianmjim](https://github.com/adrianmjim)

See also the list of contributors who [participated](https://github.com/adrianmjim/nestjs-supabase-js/contributors) in this project.

## Show Your Support

Please ⭐️ this repository if this project helped you!

## 📝 License

Copyright © 2024 [Adrián Martínez Jiménez](https://github.com/adrianmjim).

This project is licensed under the MIT License - see the [LICENSE file](LICENSE) for details.