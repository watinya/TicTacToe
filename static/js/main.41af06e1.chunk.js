(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{14:function(e,t,n){},9:function(e,t,n){"use strict";n.r(t);var s=n(8),i=n(3),r=n(4),a=n(6),c=n(5),o=n(1),u=n.n(o),l=n(7),h=n.n(l),j=(n(14),n(0));function b(e){return Object(j.jsx)("button",{className:"square ".concat(e.winning?"winning-line":""),onClick:e.onClick,children:e.value})}var d=function(e){Object(a.a)(n,e);var t=Object(c.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"renderSquare",value:function(e,t){var n=this;return Object(j.jsx)(b,{value:this.props.squares[e],winning:t,onClick:function(){return n.props.onClick(e)}})}},{key:"render",value:function(){for(var e=[],t=0;t<3;t++){for(var n=[],s=0;s<3;s++){var i=3*t+s,r=!1,a=this.props.winningLine;a&&a.includes(i)&&(r=!0),n.push(Object(j.jsx)("span",{children:this.renderSquare(i,r)},i))}e.push(Object(j.jsx)("div",{className:"board-row",children:n},t))}return Object(j.jsx)("div",{children:e})}}]),n}(u.a.Component),p=function(e){Object(a.a)(n,e);var t=Object(c.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).state={history:[{squares:Array(9).fill(null)}],stepNumber:0,oIsNext:!0,isDescending:!1},s}return Object(r.a)(n,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),n=t[t.length-1].squares.slice();v(n)||n[e]||(n[e]=this.state.oIsNext?"O":"X",this.setState({history:t.concat([{squares:n,location:[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]][e]}]),stepNumber:t.length,oIsNext:!this.state.oIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,oIsNext:e%2===0})}},{key:"sortHistory",value:function(){this.setState({isDescending:!this.state.isDescending})}},{key:"restart",value:function(){this.setState({history:[{squares:Array(9).fill(null)}],stepNumber:0,oIsNext:!0,isDescending:!1})}},{key:"render",value:function(){var e,t,n=this,s=this.state.history,i=s[this.state.stepNumber],r=v(i.squares),a=s.map((function(e,t){var i=t?"Go to move #"+t+" "+(t%2?"O":"X")+" @ "+s[t].location:"Go to game start";return Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:function(){return n.jumpTo(t)},children:t===n.state.stepNumber?Object(j.jsx)("b",{children:i}):i})},t)}));return r?(e="Winner : "+r.sign,t=r.line):e=i.squares.includes(null)?"Next Player : "+(this.state.oIsNext?"O":"X"):"Draw",Object(j.jsxs)("div",{className:"game",children:[Object(j.jsx)("div",{className:"game-board",children:Object(j.jsx)(d,{squares:i.squares,winningLine:t,onClick:function(e){return n.handleClick(e)}})}),Object(j.jsxs)("div",{className:"game-info",children:[Object(j.jsx)("button",{onClick:function(){return n.restart()},children:"RESTART"}),Object(j.jsx)("div",{id:"info",children:e}),Object(j.jsxs)("button",{onClick:function(){return n.sortHistory()},children:["Sort by: ",this.state.isDescending?"Ascending":"Descending"]}),Object(j.jsx)("ol",{children:this.state.isDescending?a.reverse():a})]})]})}}]),n}(u.a.Component);function v(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],n=0;n<t.length;n++){var i=Object(s.a)(t[n],3),r=i[0],a=i[1],c=i[2];if(e[r]&&e[r]===e[a]&&e[r]===e[c])return{sign:e[r],line:t[n]}}return null}h.a.render(Object(j.jsx)(p,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.41af06e1.chunk.js.map