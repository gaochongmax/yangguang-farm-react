import { ROLES } from '@/utils/constant'

export interface User {
  name: string,
  mobile: string,
  role: ROLES,
  avatar_id: string,
  avatar_url: string,
}