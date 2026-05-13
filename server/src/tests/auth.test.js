// Manual API test for auth routes — run with: node src/tests/auth.test.js
require("dotenv").config()
const http=require("http")

const BASE="http://localhost:5000/api/auth"

function post(url,data){
    return new Promise((resolve,reject)=>{
        const body=JSON.stringify(data)
        const options={
            method:"POST",
            headers:{"Content-Type":"application/json","Content-Length":Buffer.byteLength(body)}
        }
        const req=http.request(url,options,(res)=>{
            let raw=""
            res.on("data",chunk=>raw+=chunk)
            res.on("end",()=>{
                try{ resolve({status:res.statusCode,body:JSON.parse(raw)}) }
                catch{ resolve({status:res.statusCode,body:raw}) }
            })
        })
        req.on("error",reject)
        req.write(body)
        req.end()
    })
}

async function runTests(){
    console.log("=== Auth Tests ===\n")

    console.log("1. Register test")
    const register=await post(`${BASE}/register`,{
        username:"testuser123",
        email:"testuser123@example.com",
        password:"secret123"
    })
    console.log("Status:",register.status,"Body:",register.body)

    console.log("\n2. Login test")
    const login=await post(`${BASE}/login`,{
        email:"testuser123@example.com",
        password:"secret123"
    })
    console.log("Status:",login.status,"Body:",login.body)

    console.log("\n3. Missing fields test")
    const missing=await post(`${BASE}/login`,{email:""})
    console.log("Status:",missing.status,"Body:",missing.body)

    console.log("\n=== Done ===")
}

runTests().catch(console.error)
