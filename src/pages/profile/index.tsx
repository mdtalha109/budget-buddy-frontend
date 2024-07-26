import UserDetail from '../../components/profile/userDetail'
import UserSecurity from '../../components/profile/userSecurity'

const Profile = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-6 md:px-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <UserDetail />
          <UserSecurity />
        </div>
      </main>
    </div>
  )
}

export default Profile