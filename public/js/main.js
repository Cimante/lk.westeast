"use strict";$(document).ready(function(){$.ajax({url:"/readusers",type:"POST",contentType:"application/json"}).done(function(t){for(var a in t.response)$("tbody#contentTBody").append("\n\t\t\t\t<tr>\n\t\t\t\t<td>".concat(t.response[a].Office,"</td>\n\t\t\t\t<td>").concat(t.response[a].LastName,"</td>\n\t\t\t\t<td>").concat(t.response[a].FirstName,"</td>\n\t\t\t\t<td>").concat(t.response[a].MiddleName,"</td>\n\t\t\t\t<td>").concat(t.response[a].Email,"</td>\n\t\t\t\t</tr>\n\t\t\t\t"))}).fail(function(){alert("Караул, нихрена не получилось!")}),"/create-success"===window.location.pathname&&(localStorage.getItem("new_email")?($("#new-email").text("".concat(localStorage.getItem("new_email")," ")),localStorage.removeItem("new_email")):window.location.replace("/")),$("button#sendNewUser").click(function(t){t.preventDefault();var a={LastName:$("#LastName").val(),FirstName:$("#FirstName").val(),MiddleName:$("#MiddleName").val(),Office:$("#Office").val(),Email:$("#Email").val(),Phone:$("#Phone").val(),FullCompanyName:$("#FullCompanyName").val(),ShortCompanyName:$("#ShortCompanyName").val(),Address:$("#Address").val(),INN:$("#INN").val(),KPP:$("#KPP").val(),OGRN:$("#OGRN").val(),OKPO:$("#OKPO").val(),Bank:$("#Bank").val(),BIK:$("#BIK").val(),CorporateAcc:$("#CorporateAcc").val(),PaymentAcc:$("#PaymentAcc").val()};$.ajax({url:"/add-user",type:"POST",contentType:"application/json",data:JSON.stringify(a)}).done(function(t){localStorage.setItem("new_email",t),window.location.replace("/create-success")})}),$("button#btn_log").on("click",function(t){t.preventDefault();var a={email:$("input#login").val(),password:$("input#pass").val()};$.ajax({url:"/login",type:"POST",contentType:"application/json",data:JSON.stringify(a)}).done(function(t){t.ok&&($("span#invalid").hasClass("d-none")||$("span#invalid").addClass("d-none"),window.location.reload())}).fail(function(t){t=JSON.parse(JSON.stringify(t)),$("span#invalid").removeClass("d-none").addClass("text-center").text(t.responseJSON.message)})}),$("button#logout").click(function(){$.ajax({url:"/logout",type:"POST",data:null}).done(function(){alert("EXIT SUCCESS")})})});