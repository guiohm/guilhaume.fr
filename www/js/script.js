var Chromo = (function(){
    var colorChangePID;
    var colors = ["#1abc9c","#3498db","#ea5b4d","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b","#06b3db","#e3b63d","#dc3d66","#bd3559","#0082c8","#16528e","#e54b4b","#a2c5bf","#167c80","#72616e","#72BDC2","#F99899","#2C9AB7","#52BAD5","#6DC5DC","#B1E0EC","#449A88","#72C1B0","#95D1C4","#C5E5DE","#FEBE12","#FED156","#DB3A1B","#E85C41","#EE836E","#66CC99","#8A9BB1","#CC89A2","#C26787","#64AE60","#27695E","#993366","#8E368B","#345773","#E8755C","#DB334E","#98AE60","#78AD45","#547B30","#527D5A","#D83944","#993366","#782344","#91CFA1"];

    var twelve_colors = [
        "#E03658", // ecarlate
        "#DB3939", // red
        "#f39c12", // orange
        // "#CDCD22", // yellow
        // "#83CF31", // citron vert
        "#149414", // vert
        "#27ae55", // site default color
        // "#29C09C", // turquoise
        // "#1CBEBE", // cyan
        "#0082c8", // indigo
        "#3A3AD1", // bleu
        "#B231DB", // violet
        "#E03D84", // magenta
    ];

    // Color Palette test code:
    //
    // var $el = $('#tcolor_palette_test .row');
    // for (var i in twelve_colors) {
    //     $el.append($('<div class="col-xs-1" style="height:100px;background-color:'+twelve_colors[i]+'">'+twelve_colors[i]+'</div>'));
    // }
    // for (var i in colors) {
    //     $el.append($('<div class="col-xs-1" style="height:100px;background-color:'+colors[i]+'">'+colors[i]+'</div>'));
    // }

    function activateColorChange(colorId) {
        var i = colorId || 3;
        $("body").css("transition", "all 7s ease-in-out");
        if (colorId) {
            $("body").css("background", twelve_colors[i]);
        }
        colorChangePID = setInterval(function() {
            // var bodybgarrayno = Math.floor(Math.random() * colors.length);
            i++;
            if (i > twelve_colors.length) {
                i = 0;
            }
            $("body").css("background", twelve_colors[i]);
        }, 14000);
        // $('#color_animation_toggle').text('changement couleurs ON');
    }

    function stopColorChange() {
        clearInterval(colorChangePID);
        colorChangePID = undefined;
        $("body").css("transition", "all 1s ease-in-out");
        $("body").css("background", "rgb(39, 174, 85)");
        // $('#color_animation_toggle').text('changement couleurs OFF');
        ga('send', 'event', 'color change off', 'color change off', 'color change off');
    }

    function toggleColorChange() {
        if (colorChangePID) {
            stopColorChange();
        } else {
            activateColorChange(5);
        }
    }

    function isStopped() {
        return colorChangePID === undefined;
    }

    return {
        'activateColorChange': activateColorChange,
        'toggleColorChange': toggleColorChange,
        'isStopped': isStopped,
    }
})();

function scrollTo($el, duration) {
    duration = duration || 200;
    $('html, body').animate({
        scrollTop: $el.offset().top - 40
    }, duration);
}

$(document).ready(function(){
    $('body').scrollspy({ target: '.navbar', offset: 200});

    $('.navbar a').click(function(ev) {
        if (!ev.currentTarget.hash) {
            return;
        }
        ev.preventDefault();
        scrollTo($(ev.currentTarget.hash));
        ga('send', 'pageview', {
          'page': '/'+ ev.currentTarget.hash,
          'title': ev.currentTarget.hash
        });
    });

    var $colorChangeToggleButtons = $('.color_change_button');
    var $masterColorSwitchButton = $('#master_color_switch_button');
    var buttonText = [
        'Activer la rotation de couleurs',
        'Stopper la rotation de couleurs'
    ];

    function toggleColorChangeTrigger() {
        $colorChangeToggleButtons.find('.btn')
            .toggleClass('active')
            .toggleClass('btn-default');

        if ($colorChangeToggleButtons.find('.btn-primary').size()) {
            $colorChangeToggleButtons.find('.btn').toggleClass('btn-primary');
            $('.icone-rotation, .icon-lamp').toggleClass('icone-on');
            if ($masterColorSwitchButton.text() == buttonText[0]) {
                $masterColorSwitchButton.text(buttonText[1]);
            } else {
                $masterColorSwitchButton.text(buttonText[0]);
            }
        }
        Chromo.toggleColorChange();
    }

    $('.color_change_button_label').click(toggleColorChangeTrigger);
    $('.chromo-icon').click(toggleColorChangeTrigger);
    $colorChangeToggleButtons.click(toggleColorChangeTrigger);
    // Auto-start after 30s
    setTimeout(() => {
        if (Chromo.isStopped()) toggleColorChangeTrigger();
    }, 30000);

    // Soumission Livre d'Or
    $('#livredor_submit').click(function(e) {
        e.preventDefault();
        $.post(
            'php/bien_recu.php',
            $('#livredor_form').serialize(),
            function(data) {
                if (data.success) {
                    $('#livredor_success').fadeIn(800);
                }
            },
            'json').fail(function() {
                alert("Ooops, il y a eu un léger problème, merci de réessayer plus tard.");
            });
    });

    // Tracking liens externes
    $('.external_link').click(function() {
        var href = $(this).prop('href');
        ga('send', 'event', 'clic on: '+href, href, href);
    });

    // Boutton switch Actualités
    $actuSwitchButtons = $('.actu_switch > button');
    $actuSwitchButtons.click(function(e) {
        e.preventDefault();
        $actuSwitchButtons.toggleClass('active');
        var tabName = $(this).data('target');
        $('.event-list:visible').fadeOut('fast', function() {
            $('.event-list.' + tabName).fadeIn();
        });
    });
});
