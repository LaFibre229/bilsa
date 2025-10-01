'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/api/api"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"


export default function LoginForm({
  className,
  ...props
}) {

    const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/auth/forgot-password', { email })

      if (res.status === 200) {
        toast.success('Password reset email sent ✔️')
        router.push('/login')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending reset email')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgotten Password</CardTitle>
          <CardDescription>
            Hey ! Nous allons vous aider en quelques etapes simples a retrouver l'acces a votre compte. 
            
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              
              
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
               
                <Button 
                disabled={loading}
                type="submit" 
                className="w-full">
                 {loading ? 'Sending...' : 'Send reset link'}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}