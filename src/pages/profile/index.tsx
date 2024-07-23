import React from 'react'
import { Card, CardContent, CardFooter } from '../../components/ui/Card'
import { Button, Input } from '../../components/ui'

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
   
    <main className="flex-1 py-12 px-6 md:px-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Update your personal information.</p>
          </div>
          <Card>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
               
                  <Input label='Name' onChange={()=> {}} id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                 
                  <Input label='Email' onChange={()=>{}} id="email" type="email" defaultValue="john@example.com" />
                </div>
              </div>
              
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Security</h2>
            <p className="text-muted-foreground">Update your password and delete your account.</p>
          </div>
          <Card>
            <CardContent className="grid gap-6">
              <div className="space-y-2">
               
                <Input onChange={()=>{}} label='Current Password' id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                
                <Input label='New Password' onChange={()=>{}} id="new-password" type="password" />
              </div>
              <div className="space-y-2">
               
                <Input label='Confirm Password' onChange={()=>{}} id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Delete Account</h3>
                <p className="text-muted-foreground">
                  Deleting your account is a permanent action and cannot be undone.
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
  )
}

export default Profile