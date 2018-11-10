# hospital-interface

Bussiness Process :
1. Employee must be login first
2. Employee can register
3. Employee with role doctor can do addPatient
4. Employee only login in one account


Interface:
=== Welcome to Hospital Interface ===
Need help?
[1] 'register': node index.js register username password role
[2] 'login' : node index.js  login username password
case :  error  [403] : You already login with another account
        error  [404] : Username or Password is wrong
ControllerEmployee.login(username, password)
break;
[3] 'addPatient': node index.js addPatient nama_patient sakit_patient
case :  error  [401] : Anda tidak memiliki akses untuk melakukan addPatient
        error  [402] : Anda belum login
[4] 'logout' : node index.js logout
case : error  [402] : Anda belum login
[5] 'help' : node index.js help
