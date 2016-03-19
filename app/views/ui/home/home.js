angular.module('myApp').controller('HomeCtrl', HomeCtrl);
function HomeCtrl(Helper) {
    Helper.broadcastWhat('handlChangeIsHomePage', true);


    $(document).ready(function () {
        $('.rev_slider').revolution({
            //delay: 9000,
            //startwidth: 1170,
            //startheight: 500,
            //hideThumbs: 10,
            //fullWidth: "on",
            //autoHeight: 'on',
            //forceFullWidth: "on",
            //hideTimerBar: 'on',
            //// fullScreen:'on'
            //onHoverStop: 'off'
            sliderType:"standard",
            sliderLayout:"fullwidth",
            lazyType:"smart",
            responsiveLevels:[1920,1024,778,480,320],
            gridwidth:[1200,860,760,460],
            gridheight:720,
            debug:false,
            disableProgressBar: 'on',
            navigation:{
                arrows:{
                    enable:true
                }
            }
        });

    });
}
;