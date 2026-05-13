// Manual API test for resume routes — run with: node src/tests/resume.test.js
// Make sure the server is running and you have a valid token
require("dotenv").config()
const http=require("http")
const fs=require("fs")
const path=require("path")
const FormData=require("form-data")

const BASE="http://localhost:5000/api"

// NOTE: Replace this with a real token from logging in first
const TOKEN="your_jwt_token_here"

function getWithAuth(url){
    return new Promise((resolve,reject)=>{
        const options={
            method:"GET",
            headers:{Authorization:`Bearer ${TOKEN}`}
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
        req.end()
    })
}

async function runTests(){
    console.log("=== Resume Tests ===\n")

    console.log("1. Get all resumes test")
    const resumes=await getWithAuth(`${BASE}/resume`)
    console.log("Status:",resumes.status,"Body:",resumes.body)

    console.log("\n=== Done ===")
}

runTests().catch(console.error)
