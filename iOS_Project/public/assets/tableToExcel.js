var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
            , base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            }
    , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    }
    return function (table, name, ExcelFileName) {
        if (!table.nodeType)
            table = document.getElementById(table)
        if (name == 'feedback') {
            var old_html = table.innerHTML;
            table.innerHTML = table.innerHTML.replace('Q 1', 'Food quality?');
            table.innerHTML = table.innerHTML.replace('Q 2', 'Speed of the delivery of the food?');
            table.innerHTML = table.innerHTML.replace('Q 3', 'Behavior and efficiency of the staff?');
            table.innerHTML = table.innerHTML.replace('Q 4', 'Appearance of the staff?');
            table.innerHTML = table.innerHTML.replace('Q 5', 'Cleaning of the restaurant and facilities like bathroom?');
        }
//        table.innerHTML = table.innerHTML.replace('<th>Action</th>', '');
//        table.innerHTML = table.innerHTML.replace('<button type="button" class="btn btn-success btn-xs" ng-click="ShowFeedBacks(feed)">FeedBacks</button>', '');
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
//        window.location.href = uri + base64(format(template, ctx))
        var link = document.createElement("a");
        link.download = ExcelFileName + ".xls";
        link.href = uri + base64(format(template, ctx));
        link.click();
        if (name == 'feedback') {
            table.innerHTML = old_html;
        }
    }
})()