if the user is authenticated then he can see contact details of other alumini.
public user can see the alumnii profile but he cannot see the contact details.
whenever a user update the profie his verification status should change to not verified.


{FRONTEND_URL}/verify-email-and-complete-profile?token=${token}&email=${existingUser.email} we will have a form as a webpage for taking  the following data and sending it to the backend api {BASE_URL}/verify-email-and-complete-profile?token=${token}&email=${existingUser.email}
  photo 
  course 
  department 
  batch 

  enroll 
  phone 
  linkdn 
  twitter 
  facebook 
  instagram 
  emailVerified Boolean @default(false)
  accountVerified Boolean @default(false)
  phoneVarified Boolean @default(false)


  ${FRONTEND_URL}/forgetpassword?token=${token}&email=${user.email} take you to a web page form with inputs for newPassword and ConfirmNewPassword for reseting password and send the newPassword and confirmNewPassword to the backend api
  ${BASE_URL}/reset-password?token=${token}&email=${user.email} 