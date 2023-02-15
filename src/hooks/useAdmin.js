import { useEffect, useState } from "react"

const useAdmin=email=>{
const [isAdmin,setIsAdmin]=useState(false)
const [useAdminLoading,setUseAdminLoading]=useState(true)   
useEffect(()=>{
    if(email){
    fetch(`http://localhost:7000/users/admin/${email}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setIsAdmin(data.isAdmin)
        setUseAdminLoading(false)
    })
    }
},[email])
return [isAdmin,useAdminLoading ]
}

export default useAdmin