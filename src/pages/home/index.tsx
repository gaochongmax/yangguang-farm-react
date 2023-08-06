import React from 'react'
import { useAppSelector } from '@/hooks'
import { ROLES } from '@/utils'
import FarmerHome from './farmer'
import SellerHome from './seller'

const Home: React.FC = () => {
  const user = useAppSelector(state => state.user)

  return (
    <div className='g-page'>
      {user.role === ROLES.farmer && <FarmerHome />}
      {user.role === ROLES.seller && <SellerHome />}
    </div>
  )
}

export default Home