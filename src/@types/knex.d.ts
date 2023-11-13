// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    events: {
      id: string
      title: string
      description: string
      start: string
      end: string
      created_at: string
      updated_at: string
    }
  }
}
