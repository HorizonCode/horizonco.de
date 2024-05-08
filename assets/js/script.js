var loading = false;
const timer = ms => new Promise(res => setTimeout(res, ms));
const dateField = $("#date");
const clockHours = $("#clock #hours");
const clockMinutes = $("#clock #minutes");
const clockSeconds = $("#clock #seconds");
const age = getAge(Date.parse("1999/01/06 UTC"));
const cursor = $(".cursor");
const cursorborder = $(".cursorborder");

$(window).on("load", function() {
    $("#age").html(age);

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        cursor.remove();
        cursorborder.remove();
    }else{
        $(".red").mouseover(function() {
            cursor.addClass('hover');
        });

        $(".red").mouseleave(function() {
            cursor.removeClass('hover');
        });

        $(".task-button").mouseover(function() {
            cursor.addClass('hover');
        });

        $(".task-button").mouseleave(function() {
            cursor.removeClass('hover');
        });

        $("body").mousemove(function(e) {
            var x = e.pageX;
            var y = e.pageY;
            cursor.css("left", x + "px");
            cursor.css("top", y + "px");
            cursorborder.css("transform", "translate3d(calc(" + e.clientX + "px - 50%), calc(" + e.clientY + "px - 50%), 0)");
        });
    }
    setInterval(function(){
        const currentDate = new Date();
        const newDateString = currentDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        if(clockHours.html() != hours){
            clockHours.html(hours < 10 ? "0" + hours : hours);
            clockHours.attr("data-content", hours < 10 ? "0" + hours : hours);
        }

        if(clockMinutes.html() != minutes) {
            clockMinutes.html(minutes < 10 ? "0" + minutes : minutes);
            clockMinutes.attr("data-content", minutes < 10 ? "0" + minutes : minutes);
        }

        if(clockSeconds.html() != seconds) {
            clockSeconds.html(seconds < 10 ? "0" + seconds : seconds);
            clockSeconds.attr("data-content", seconds < 10 ? "0" + seconds : seconds);
        }

        if(newDateString !== dateField.html()) {
            dateField.html(newDateString);
            dateField.attr("data-content", newDateString);
        }
    }, 0, 1000);

    setTimeout(function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if(width < 715 || height < 402){
            $("#hide-mobile").hide();
        }
        $(".preloader").fadeOut(750, "swing", function() {
            $(".preloader").remove();
        });
        $(".terminal").hide().draggable({ handle: ".buttons", start: function(){ $('.buttons').css('cursor', 'move');}, stop: function(){ $('.buttons').css('cursor', '');}, containment: ".container", scroll: false });

        setTimeout(function() {
            $(".container").css('transform', 'scale(1)').css('opacity', '1');

            $(".task-button.git").click(function(e) {
                const button = $(this);
                if (!button.hasClass("progress")) {
                    button.addClass("progress");
                    setTimeout(function() {
                        window.open("https://git.ez-pp.farm", '_blank').focus();
                    }, 100);
                    setTimeout(function() {
                        if (button.hasClass("progress"))
                            button.removeClass("progress");
                    }, 1000);
                }
            });

            $(".task-button.paste").click(function(e) {
                const button = $(this);
                if (!button.hasClass("progress")) {
                    button.addClass("progress");
                    setTimeout(function() {
                        window.open("https://paste.horizonco.de", '_blank').focus();
                    }, 100);
                    setTimeout(function() {
                        if (button.hasClass("progress"))
                            button.removeClass("progress");
                    }, 1000);
                }
            });

            $(".task-button.kitsu").click(function(e) {
                const button = $(this);
                if (!button.hasClass("progress")) {
                    button.addClass("progress");
                    setTimeout(function() {
                        window.open("https://osu.direct", '_blank').focus();
                    }, 100);
                    setTimeout(function() {
                        if (button.hasClass("progress"))
                            button.removeClass("progress");
                    }, 1000);
                }
            });

            $(".task-button.term").click(function(e) {
                if ($(".terminal").is(":visible"))
                    return;

                const button = $(this);
                if (!button.hasClass("progress")) {
                    button.addClass("progress");
                    setTimeout(function() {
                        $(".terminal").fadeIn(250, "swing");
                        if ($(".terminal").hasClass("minimized")) $(".terminal").removeClass("minimized");
                    }, 1000);
                    setTimeout(function() {
                        if (button.hasClass("progress"))
                            button.removeClass("progress");
                    }, 600);
                }
            });
            $(".toolbar .buttons .red").click(function() {
                if ($(".terminal").is(":hidden"))
                    return;
                if (!$(".toolbar .buttons .red").hasClass("progress")) {
                    $(".toolbar .buttons .red").addClass("progress");
                    setTimeout(function() {
                        if (!$(".terminal").hasClass("minimized"))
                        $(".terminal").addClass("minimized");
                        $(".terminal").fadeOut(250, "swing");
                    }, 100);
                    setTimeout(function() {
                        if ($(".toolbar .buttons .red").hasClass("progress"))
                            $(".toolbar .buttons .red").removeClass("progress");
                    }, 1000);
                }
            });
        }, 450);

    }, 250 + Math.floor(Math.random() * 750));
});

$( window ).resize(function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if(width < 715 || height < 402){
        $("#hide-mobile").hide();
    } else {
        $("#hide-mobile").show();
    }
});

let historyIndex = 0;
const history = [];

const input = document.querySelector('input');
document.addEventListener('keydown', function(e) {
    switch (e.key.toLowerCase()) {
        case "arrowup":
            if (historyIndex - 1 >= 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }

            setTimeout(function() { input.selectionStart = input.selectionEnd = 10000; }, 0);
            break;
        case "arrowdown":
            if (historyIndex + 1 <= history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            }

            setTimeout(function() { input.selectionStart = input.selectionEnd = 10000; }, 0);
            break;
        case "enter":
            {
                if (input.value) {
                    if (loading) return;
                    var node = document.createElement("div");
                    node.style.color = "#888";
                    node.style.fontSize = "11px";
                    node.style.paddingLeft = '5px';

                    history.push(input.value);
                    historyIndex = history.length;

                    const splitted_cmd = input.value.split(" ");
                    const label = splitted_cmd[0];

                    switch (label.toLowerCase()) {
                        case "neofetch":
                            addLine("<a style='color: #068984;font-weight: 800;'>                   -`                    horizon</a><a style='font-weight: 800;'>@</a><a style='color: #068984;font-weight: 800;'>horizoncode</a>");
                            addLine("<a style='color: #068984;font-weight: 800;'>                  .o+`                   </a>-------------");
                            addLine("<a style='color: #068984;font-weight: 800;'>                 `ooo/                   OS</a><a style='font-weight: 800;'>:</a> Linux Arch");
                            addLine("<a style='color: #068984;font-weight: 800;'>                `+oooo:                  Host</a><a style='font-weight: 800;'>:</a> NZXT N7 Z390");
                            addLine("<a style='color: #068984;font-weight: 800;'>               `+oooooo:                 Kernel</a><a style='font-weight: 800;'>:</a> 6.3.2-273-tkg-cfs");
                            addLine("<a style='color: #068984;font-weight: 800;'>               -+oooooo+:                Uptime</a><a style='font-weight: 800;'>:</a> " + age + " years");
                            addLine("<a style='color: #068984;font-weight: 800;'>             `/:-:++oooo+:               Projects</a><a style='font-weight: 800;'>:</a> 2");
                            addLine("<a style='color: #068984;font-weight: 800;'>            `/++++/+++++++:              Shell</a><a style='font-weight: 800;'>:</a> zsh");
                            addLine("<a style='color: #068984;font-weight: 800;'>           `/++++++++++++++:             </a>-------------                      ");
                            addLine("<a style='color: #068984;font-weight: 800;'>          `/+++ooooooooooooo/`           CPU</a><a style='font-weight: 800;'>:</a> Intel i9-9900K (16) @ 5.2000GHz");
                            addLine("<a style='color: #068984;font-weight: 800;'>         ./ooosssso++osssssso+`          GPU</a><a style='font-weight: 800;'>:</a> NVidia RTX 3070");
                            addLine("<a style='color: #068984;font-weight: 800;'>        .oossssso-````/ossssss+`         Memory</a><a style='font-weight: 800;'>:</a> 32045MiB");
                            addLine("<a style='color: #068984;font-weight: 800;'>       -osssssso.      :ssssssso.");
                            addLine("<a style='color: #068984;font-weight: 800;'>      :osssssss/        osssso+++.");
                            addLine("<a style='color: #068984;font-weight: 800;'>     /ossssssss/        +ssssooo/-");
                            addLine("<a style='color: #068984;font-weight: 800;'>   `/ossssso+/:-        -:/+osssso+-");
                            addLine("<a style='color: #068984;font-weight: 800;'>  `+sso+:-`                 `.-/+oso:");
                            addLine("<a style='color: #068984;font-weight: 800;'> `++:.                           `-/+/");
                            addLine("<a style='color: #068984;font-weight: 800;'> .`                                 `/");
                            break;

                        case "twitter":
                            loadMsg("loading twitter profile page", "https://twitter.com/@RealHorizon");
                            break;

                        case "github":
                            loadMsg("loading github profile page", "https://github.com/HorizonCode");
                            break;

                        case "youtube":
                            loadMsg("loading youtube profile page", "https://www.youtube.com/horizoncode88");
                            break;

                        case "projects":
                            addLine("======================> Project list <======================");
                            addLine("<a class='link' href='https://ez-pp.farm' target='_blank'>https://ez-pp.farm</a> - a private osu! server");
                            addLine("<a class='link' href='https://osu.direct' target='_blank'>https://osu.direct</a> - a osu! beatmap crawler slave");
                            addLine("============================================================");
                            break;

                        case "clear":
                            $(".commands p").remove();
                            break;

                        case "?":
                        case "help":
                            addLine('Supported commands: clear, github, neofetch, projects, twitter, youtube');
                            break;

                        default:
                            addLine(label + ": command not found");
                            break;

                    }
                    input.value = "";
                    $(".terminal").scrollTop($(".commands")[0].scrollHeight);
                    focusTerminal();
                }
            }
    }
});

async function loadMsg(text, url) {
    loading = true;
    let text_changed = text;
    for (var i = 0; i <= 3; i++) {
        if (i > 0) $(".commands p").last().remove();
        addLine(text_changed);
        await timer(1000);
        text_changed += ".";
    }
    window.open(url, '_blank').focus();
    loading = false;
}

function addLine(line_text) {
    addLine(line_text, false)
}

function addLine(line_text, as_text) {
    const line = document.createElement("p");
    line.style.display = 'block';
    line.style.marginTop = '3px';
    if (!as_text) {
        line.innerHTML = line_text;
    } else {
        const text = document.createTextNode(line_text);
        line.appendChild(text);
    }
    document.querySelector(".commands").appendChild(line);
}

function focusTerminal() {
    document.querySelector('input').focus();
}

function getAge(date) {
    const diff = Date.now() - date;
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return age;
}
