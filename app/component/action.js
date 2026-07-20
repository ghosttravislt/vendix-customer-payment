"use server"
// export const confirmPayment = async (formData,e)=>{

  
//   const token= formData.get("token")
//   const amount_paid = formData.get("amount_paid")

//   const inputData = {
//     token:token,
//     amount_paid:amount_paid
//   }

  
//   try {
//   const confirmPaymentRequest = await fetch("http://localhost:8090/api/transactions/confirm",{
//     method :"PUT",
//     headers:{
//        "Content-Type":"application/json"
//     },
//     body:JSON.stringify(inputData)
//    }) 

  
//     const data = await confirmPaymentRequest.json()
//       console.log(data)
//   } catch (error) {
//     return {
//       error:error,
//       message: "Payment failed",
//     };
//   }
// }


"use server"

export const confirmPayment = async (prevState, formData)=>{

  const token = formData.get("token");
  const amount_paid = formData.get("amount_paid");

  try {

    const response = await fetch(
      "http://localhost:8090/api/transactions/confirm",
      {
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          token: Number(token),
          amount_paid: Number(amount_paid)
        })
      }
    );

    const data = await response.json();

    if(!response.ok){
      return {
        success:false,
        message:data.message || "Payment failed"
      };
    }

    return {
      success:true,
      data
    };

  } catch(error){

    return {
      success:false,
      message:error.message
    };
  }
}
