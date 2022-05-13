import{A as c,t as g,p as v,r as u,s as p,O as i,a as T,g as h}from"./global.59fbbf55.js";const y=a=>{const t=a.currentTarget.dataset.id;document.querySelector(`#teamsTable tbody tr[data-id="${t}"]`).remove(),u(+t)},$=a=>{const t=a.currentTarget,e=t.dataset.sort,s=t.dataset.order,r=T[s],o=p(e,s);m(o),t.dataset.order=r,t.classList.remove(i[s]),t.classList.add(i[r]);const n=document.querySelector(`[data-sort]:not([data-sort="${e}"])`);n.classList.remove(i[1],i[-1]),n.classList.add(i[0])},E=()=>{document.querySelectorAll(`[data-action=${c.DELETE}]`).forEach(a=>{a.addEventListener("click",y)}),document.querySelectorAll("[data-sort]").forEach(a=>{a.addEventListener("click",$)})},m=a=>{let t="";a.forEach(e=>{t+=`
            <tr data-id="${e.id}">
                <td>${e.name}</td>
                <td>${e.description}</td>
                <td>
                    <div class="action-icons">
                        <i class="fa-solid fa-trash" alt="Delete" title="Delete" data-action="${c.DELETE}" data-id="${e.id}"></i>
                        <i class="fa-solid fa-share-nodes" alt="Share" title="Share" data-action="${c.SHARE}" data-id="${e.id}"></i>
                        <a href="/team.html?id=${e.id}">
                            <i class="fa-solid fa-pen" alt="Edit" title="Edit"></i>
                        </a>
                    </div>
                </td>
            </tr>
        `}),document.querySelector("#teamsTable tbody").innerHTML=t,E()},d=(a,t)=>{let e="";for(let s=0;s<5;s++){const r=t[s];e+=`<li title="${r.team.name}"><a href="/team.html?id=${r.team.id}"><span>${r.team.name}</span> <b>${r.avg}</b></a></li>`}document.querySelector(`#${a} ul`).innerHTML=e},L=a=>{const t=g(a);if(t.length>0){const e=t.slice().sort((r,o)=>o.avg-r.avg),s=t.slice().sort((r,o)=>r.avg-o.avg);d("highAgeAvg",e),d("lowAgeAvg",s)}},l=(a,t)=>{const e=document.querySelector(`#${a}`),s=`<span title="${t.player.name}">${t.player.initials}</span>`;e.querySelector(".percentage span").textContent=t.percentage,e.querySelector(".player-photo").innerHTML=s},S=a=>{const t=v(a);if(t.length>0){const e=t.slice().sort((s,r)=>s.picks-r.picks);l("mostPickedPlayer",e[e.length-1]),l("lessPickedPlayer",e[0])}};window.addEventListener("resourcesLoaded",function(a){const t=h();m(t),L(t),S(t)});
