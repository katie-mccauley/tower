var r=Object.defineProperty,k=Object.defineProperties;var v=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var d=(a,e,t)=>e in a?r(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,g=(a,e)=>{for(var t in e||(e={}))T.call(e,t)&&d(a,t,e[t]);if(p)for(var t of p(e))y.call(e,t)&&d(a,t,e[t]);return a},l=(a,e)=>k(a,v(e));import{a as c,l as s,A as i}from"./index.1c564fd6.js";class m{async getEventTickets(e){const t=await c.get("api/events/"+e+"/tickets");s.log("this is tickets",t.data),i.peopleTickets=t.data}async addTicket(e){const t=await c.post("api/tickets",e);s.log(t.data);const n=l(g({},t.data),{name:t.data.name,picture:t.data.picture});i.peopleTickets.push(n),i.activeEvent.capacity=i.activeEvent.capacity-1,this.getEventTickets(e.eventId)}async getAccountTickets(){const e=await c.get("account/tickets");s.log("my events that I am going to",e.data),i.attending=e.data}async deleteTicket(e,t){const n=await c.delete("api/tickets/"+t);s.log("deleting ticket",n.data),i.attending=i.attending.filter(o=>o.id!==t),i.peopleTickets=i.peopleTickets.filter(o=>o.id!==t),i.towerEvents.capacity++,this.getAccountTickets()}}const w=new m;export{w as t};