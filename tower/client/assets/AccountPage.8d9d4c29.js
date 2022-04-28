import{_ as m,l,P as g,A as _}from"./index.0dadc13f.js";import{u as v,E as y,c as h,o as c,b as e,d as t,t as a,F as f,G as k,g as n,p as w,h as b}from"./vendor.603ec2c7.js";import{t as u}from"./TicketsService.2aaa667c.js";const x={name:"Account",setup(){return v(),y(async()=>{try{await u.getAccountTickets()}catch(o){l.error(o)}}),{account:h(()=>_.account),myAttending:h(()=>_.attending),async deleteTicket(o,d){try{await g.confirm()&&await u.deleteTicket(o,d)}catch(r){l.error(r)}}}}},p=o=>(w("data-v-835aa894"),o=o(),b(),o),A={class:"container-fluid"},S={class:"row justify-content-start ms-5"},I={class:"col-md-6 text-white"},T={class:"lightcolor"},j={class:"row justify-content-center"},D={class:"card border border-3 rounded p-0 m-0"},C=["src"],P={class:"card-img-overlay p-0 m-0 text-dark filter lightcolor align-items-end"},B={class:"row justify-content-md-around align-items-end h-100 p-0 m-0"},E={class:"col-md-12 col-8 backgroundfix m-0 w-100 p-0"},N={class:"row p-0 m-0"},F={class:"col-md-10 col-10 ps-0"},L={class:"lightcolor"},V={class:"col-md-1 col-2 ps-4"},$=["onClick"],G={class:"lightcolor"},M={class:"row"},R={class:"col-7"},q={class:"lightcolor"},z={class:"col-4"},H={key:0,class:"lightcolor"},J={key:0,class:"bg-warning"},K=p(()=>t("h5",null,"This is canceled",-1)),O=[K],Q={key:1,class:"bg-danger"},U=p(()=>t("h5",null,"No more seats",-1)),W=[U];function X(o,d,r,i,Y,Z){return c(),e("div",A,[t("div",S,[t("div",I,[t("h1",T,"Events for "+a(i.account.name),1)])]),t("div",j,[(c(!0),e(f,null,k(i.myAttending,s=>(c(),e("div",{class:"col-md-3 col-10 lightcolor rounded p-0 m-4",key:s.id},[t("div",D,[t("img",{src:s.coverImg,class:"img-fluid p-0 cropped",alt:""},null,8,C),t("div",P,[t("div",B,[t("div",E,[t("div",N,[t("div",F,[t("h4",L,a(s.name),1)]),t("div",V,[t("button",{onClick:tt=>i.deleteTicket(s.accountId,s.ticketId),title:"Delete Ticket",type:"button",class:"btn-close btn-close-white","aria-label":"Close"},null,8,$)])]),t("h4",G,a(new Date(s.startDate||s.event.startDate).toLocaleDateString()),1),t("div",M,[t("div",R,[t("h5",q,a(s.location),1)]),t("div",z,[s.capacity>0?(c(),e("h5",H,a(s.capacity)+" spots ",1)):n("",!0)])]),s.isCanceled?(c(),e("div",J,O)):n("",!0),s.capacity<=0?(c(),e("div",Q,W)):n("",!0)])])])])]))),128))])])}var et=m(x,[["render",X],["__scopeId","data-v-835aa894"]]);export{et as default};
