export const LoginPage = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Sign In</h2>
    <form className="space-y-4">
      <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
      <Button className="w-full">Login</Button>
    </form>
  </div>
) 