var domain = {uri : "http://"+window.location.hostname+"/"};
domain.longueur= domain.uri.length;

//Static
var View = {

    listIdView : [
        {id:"portfolio",printed:"Portfolio"},
        {id:"networks",printed:"Networks"},
        {id:"about-me",printed:"About Me"}
    ],

    hideAllViews: function() {
        for (var i = 0; i < this.listIdView.length; i++) {
            document.getElementById(this.listIdView[i].id).style.display="none";   
        };
    },
    showAllElementDropDownNav:function() {
        for (var i = 0; i < this.listIdView.length; i++) {
            document.getElementById("nav_drop_"+this.listIdView[i].id).style.display="block";   
        };
    },
    updateNav : function(position) {
        View.showAllElementDropDownNav();
        document.getElementById("nav_drop_"+this.listIdView[position].id).style.display="none"; 
        document.getElementById("nav_current").innerHTML = View.listIdView[position].printed;
     
    },
    showPortfolio: function() {
        var position = 0;
        View.hideAllViews();
        View.updateNav(position);
        document.getElementById(View.listIdView[position].id).style.display="block";
         window.scrollTo(0,0);
    },
    showNetworks: function() {
        var position = 1;
        View.hideAllViews();
        View.updateNav(position);
        document.getElementById(View.listIdView[position].id).style.display="block";
        window.scrollTo(0,0);
    },
    showAboutMe: function() {
        var position = 2;
        View.hideAllViews();
        View.updateNav(position);
        document.getElementById(View.listIdView[position].id).style.display="block";
         window.scrollTo(0,0);
        
    }
}

var Router = {
    routes: [
        {
            path:'#portfolio',
            f : View.showPortfolio
        },
        {
            path:'#networks',
            f : View.showNetworks
        },{
            path:'#about-me',
            f : View.showAboutMe
        }
    ],

    current: window.location.href,
    listen: function() {
        self = this;
        var fn = function() {
            var href = window.location.href;
            if(self.current != href){
                var uri = href.substr(domain.longueur, href.length);
                self.current = window.location.href;
                self.isValidRoute(uri);
            }            
        } 
        setInterval(fn, 50);
    },
    init:function() {
        var href = window.location.href;
        var uri = href.substr(domain.longueur, href.length);
        this.current = href;
        this.isValidRoute(uri);
    },

    isValidRoute: function(uri) {
        var routeValided = false;
        var routePosition = -1;

        for (var i = 0; i < this.routes.length; i++) {
            if(this.routes[i].path == uri){
                routeValided = true;
                routePosition = i;
            }
        };

        if(routeValided){
            window.location.href = this.current.replace(/#(.*)$/, '') + this.routes[routePosition].path;
            this.routes[routePosition].f();

        }else{
            this.moveTo(this.routes[0].path);
        }
    },
    moveTo: function(uri) {
        this.isValidRoute(uri);
    }
}
Router.init();
Router.listen();




!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");