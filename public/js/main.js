"use strict";$(document).ready(function(){"/create-success"===window.location.pathname&&(localStorage.getItem("email")?($("#new-email").text("".concat(localStorage.getItem("email")," ")),localStorage.removeItem("email")):window.location.replace("/")),$("button#sendNewUser").click(function(a){a.preventDefault();var e={LastName:$("#LastName").val(),FirstName:$("#FirstName").val(),MiddleName:$("#MiddleName").val(),Office:$("#Office").val(),Email:$("#Email").val(),Phone:$("#Phone").val(),FullCompanyName:$("#FullCompanyName").val(),ShortCompanyName:$("#ShortCompanyName").val(),Address:$("#Address").val(),INN:$("#INN").val(),KPP:$("#KPP").val(),OGRN:$("#OGRN").val(),OKPO:$("#OKPO").val(),Bank:$("#Bank").val(),BIK:$("#BIK").val(),CorporateAcc:$("#CorporateAcc").val(),PaymentAcc:$("#PaymentAcc").val()};$.ajax({url:"/add-user",type:"POST",contentType:"application/json",data:JSON.stringify(e)}).done(function(a){localStorage.setItem("email",a),window.location.replace("/create-success")})}),$("button#btn_log").on("click",function(a){a.preventDefault();var e={login:$("input#login").val(),password:$("input#pass").val()};$.ajax({url:"/login",type:"POST",contentType:"application/json",data:JSON.stringify(e)}).done(function(a){console.log(a)})})});