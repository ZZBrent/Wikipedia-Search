$(document).ready(function () {

    var startMode = true;

    var search;

    var resultLength = "10";

    $("#search").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#button1").click();
        }
    });

    $("#button1").click(function () {
        if (document.getElementById("search").value == '') {
            $("#warning").empty();
            $("#warning").append("<h5 class = 'text-center alert alert-warning'>Please type something into the search bar.</h5>");
        }
        else {
            if (startMode) {
                document.getElementById("search").classList.remove('center-block');
                document.getElementById("search").classList.add('searchedTextbox');
                document.getElementById("button1").style.margin = "0 0 0 15px";
                document.getElementById("button1").style.padding = "0";
                document.getElementById("button1").style.width = "125px"; document.getElementById("button1").classList.remove('center-block'); document.getElementById("fullBody").removeChild(document.getElementById("button2"));
                document.getElementById("logo").src = "http://vignette3.wikia.nocookie.net/simpsons/images/d/dd/Wikipedia-logo.svg.png/revision/latest?cb=20100610161747";
                document.getElementById("logo").style.margin = "0 0 0 1%";
                document.getElementById("logo").style.display = "inline";
                document.getElementById("logo").width = "50";
                startMode = false;
            }

            var search = document.getElementById("search").value;

            var url = 'https://en.wikipedia.org//w/api.php' +
                '?callback=?' +
                '&action=opensearch' +
                '&format=json' +
                '&limit=' +
                resultLength +
                '&profile=fuzzy' +
                '&format=json' +
                '&search=' +
                encodeURI(search);

            $.getJSON(url, function (data) {
                $("#warning").empty();
                $("#results").empty();
                if (data[1][0] == undefined) {
                    $("#results").append("</br><h2 class = 'text-muted'>No results found... Please try a different search.</h2>");
                }
                else {
                    for (i = 0; i < resultLength; i++) {
                        if (data[1][i] == undefined) {
                            return;
                        }
                        else {
                            $("#results").append("<br/>" +
                                "<a href = '" +
                                data[3][i] +
                                "' target = '_blank'>" +
                                "<h3>" +
                                data[1][i] +
                                "</h3>" +
                                "</a>" +
                                "<p class = 'text-success'>" +
                                data[3][i] +
                                "</p>" +
                                data[2][i] +
                                "<br/>");
                        }
                    }
                }
            });
        }
    });
    $("#button2").click(function () {
        window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
    });
})