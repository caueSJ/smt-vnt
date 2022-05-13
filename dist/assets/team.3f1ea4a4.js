import{b as y,c as h,d as v,e as f,f as m,h as b,i as T,j as L}from"./global.59fbbf55.js";var E=`.choose-player{color:var(--purple-light)}
`;class w extends HTMLElement{constructor(){super(),this.build()}build(){const e=this.attachShadow({mode:"open"});e.appendChild(this.styles()),e.appendChild(this.createHTMLComponent().content)}styles(){const e=document.createElement("style");return e.textContent=E,e}createHTMLComponent(){const e=this.getAttribute("id")||"",a=this.getAttribute("name")||"",s=this.getAttribute("nationality")||"",n=JSON.parse(this.getAttribute("age")),r=document.createElement("template");return r.innerHTML=`
            <span class="choose-player" data-id="${e}" title="Name: ${a}
Nationality: ${s}
Age: ${n||"-"}">
                ${y(a)}
            </span>
        `,r}}customElements.define("cmp-choose-player",w);var I=`.tag{border-radius:15px;display:inline-flex;gap:10px;padding:4px 8px;color:var(--white);background-color:var(--pink)}.tag .remove-icon{font-weight:600;cursor:pointer}
`;class A extends HTMLElement{constructor(){super(),this.build()}connectedCallback(){this.shadowRoot.querySelector(".remove-icon").addEventListener("click",this.deleteTag)}build(){const e=this.attachShadow({mode:"open"});e.appendChild(this.styles()),e.appendChild(this.createHTMLComponent().content)}styles(){const e=document.createElement("style");return e.textContent=I,e}createHTMLComponent(){const e=this.getAttribute("name")||"",a=document.createElement("template");return a.innerHTML=`
            <div class="tag">
                <span>${e}</span>
                <span class="remove-icon">&#10005;</span>
            </div>
        `,a}deleteTag(e){document.querySelector(`cmp-tag[name="${e.currentTarget.parentNode.firstElementChild.innerText}"`).remove()}}customElements.define("cmp-tag",A);const u=t=>{const e=document.querySelector(".soccer-field");e.classList.forEach(a=>{a.indexOf("formation")!==-1&&e.classList.remove(a)}),e.classList.add(`formation-${t}`)},C=t=>{M(),c(),u(t.currentTarget.value)},H=()=>{$(".players-list li:not(.disabled)").draggable({revert:"invalid",helper:"clone",cursor:"move"}),$(".soccer-field .player-circle").droppable({accept:".players-list li",tolerance:"pointer",drop:function(t,e){const a=$(this),s=e.draggable[0],n={id:s.dataset.id,name:s.dataset.name,nationality:s.dataset.nationality,age:s.dataset.age};a.html(`
                <cmp-choose-player id="${n.id}" name="${n.name}" nationality="${n.nationality}" age="${n.age}"></cmp-choose-player>
            `),c()}})},p=()=>Array.from(document.querySelectorAll(".soccer-field cmp-choose-player")).map(a=>+a.id),M=()=>{document.querySelectorAll(".player-circle").forEach(t=>{t.innerHTML=""})},i=t=>{const e=t.currentTarget.value,a=h(e),s=p();let n="";a.forEach(r=>{n+=`
            <li class="player-infos ${s.indexOf(r.id)!==-1?"disabled":""}" data-id="${r.id}" data-name="${r.name}" data-nationality="${r.nationality}" data-age="${r.age}">
                <div>
                    <div>
                        <span><b>Name:</b> ${r.name}</span> 
                    </div>
                    <div>
                        <span><b>Nationality:</b> ${r.nationality}</span>
                    </div>
                </div>
                <div>                                                
                    <span><b>Age:</b> ${r.age||"-"}</span>
                </div>
            </li>
        `}),document.querySelector(".search-players-results .players-list").innerHTML=n,H()},c=()=>{i({currentTarget:document.getElementById("searchPlayer")})},g=()=>Array.from(document.querySelectorAll(".tag-list cmp-tag")).map(a=>a.getAttribute("name").trim()),S=t=>{const e=t.currentTarget.value.trim(),a=g();if(!(t.keyCode!==13&&t.key!==";"||e.length===0)){if(t.preventDefault(),a.includes(e)){t.currentTarget.value=null;return}document.getElementById("tagInput").insertAdjacentHTML("beforebegin",`<cmp-tag name="${e}"></cmp-tag>`),t.currentTarget.value=null}},P=()=>{document.getElementById("tagInput").focus()},x=()=>{document.getElementById("tagInput").addEventListener("keydown",S),document.querySelector(".input-tag").addEventListener("click",P)},q=t=>t!=="",F=t=>/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(t),l=t=>{document.querySelector(".header h2").innerText=`${v(t)} your team`},k=t=>{const e=document.getElementById("teamForm");e.name.value=t.name,e.description.value=t.description,e.website.value=t.website,e.type.value=t.type,t.formation||(t.formation="3-2-2-3"),e.formation.value=t.formation,u(t.formation),t.players.forEach((a,s)=>{const n=f(a);document.querySelector(`.player-circle.P${s+1}`).innerHTML=`
            <cmp-choose-player id="${n.id}" name="${n.name}" nationality="${n.nationality}" age="${n.age}"></cmp-choose-player>
        `}),t.tags.forEach(a=>{document.getElementById("tagInput").insertAdjacentHTML("beforebegin",`<cmp-tag name="${a}"></cmp-tag>`)})},d=t=>{let e=!1;const a=t.currentTarget;if(a.value.trim().length>0)for(const s in a.validity)a.validity[s]&&!a.validity.valid&&(e=!0);else e=!0;e?a.parentElement.classList.add("error"):a.parentElement.classList.remove("error")},B=t=>{const e=q(t.name.value.trim()),a=F(t.website.value.trim());return e||(t.name.value="",t.name.parentElement.classList.add("error")),a||(t.website.value="",t.website.parentElement.classList.add("error")),e&&a},N=t=>{t.preventDefault();const e=t.currentTarget;if(!B(e))return;const a=g(),s=p(),n={name:e.name.value,website:e.website.value,description:e.description.value,type:e.type.value,formation:e.formation.value,players:s,tags:a},r=m();if(r.id)n.id=+r.id,b(n),e.querySelector(".message")||e.insertAdjacentHTML("beforeend",'<span class="message">Team successfully updated!</span>');else{const o=T(n);window.location=`/team.html?id=${o}`}},D=t=>{t.addEventListener("invalid",d),t.addEventListener("blur",d)},j=()=>{const t=document.getElementById("searchPlayer");t.addEventListener("keyup",i),t.addEventListener("search",i),document.getElementById("teamForm").addEventListener("submit",N),document.getElementById("teamFormation").addEventListener("change",C),document.querySelectorAll("[required]").forEach(n=>D(n)),x()};window.addEventListener("resourcesLoaded",async t=>{const e=m();if(e.id){l("edit");const a=L(+e.id);k(a)}else l("create");j(),c()});
