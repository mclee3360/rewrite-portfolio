// ID of Google Sheet pulling data from.
var data_id = "1WiTu_F7060zf2G3QvZswbAqAFnwM7oAmrp4v3_dywbg";
// URL of sheet data in JSON format.
var json_url = "https://spreadsheets.google.com/feeds/list/" + data_id + "/default/public/values?alt=json";

// AJAX request to retrieve Google Sheet data.
$.ajax({
    url: json_url,
    dataType: 'json',
    success: function(data)
    {
        var entries = [];
        data.feed.entry.forEach(element => entries.push(extractData(element)));
        entries.sort(sortEntries)
        $("#table").DataTable({
            data: entries,
            columns: [
                {title: "Title"},
                {title: "Date Uploaded"},
                {title: "Role"}
            ],
            order: [[1, "desc"]],
            lengthChange: false,
            dom: "ftpi",
            scrollX: true,
            pageLength: 25,
            pagingType: "full"
        });
    },
    error: function(data)
    {
        console.log("ERROR: " + data);
    }
});

/**
 * Converts the JSON data into an array for the table.
 *
 * @param entry  the entry to convert from the JSON.
 * @return an array of its attributes.
 */
function extractData(entry)
{
    var name = entry.gsx$series.$t;
    var url = entry.gsx$url.$t;
    var link = "<a href=\"" + url + "\" target=\"_blank\">" + name + "</a>";
    return [link, formatDate(entry.gsx$date.$t), entry.gsx$role.$t];
}

/**
 * Formats the date strings in an easily sortable order (YYYY/MM/DD).
 * Also returns "N/A" if no date.
 *
 * @param date  the date string from Google sheets.
 * @return the formatted date.
 */
function formatDate(date)
{
    if (date.length > 0)
    {
        var values = date.split("/");
        var day = values[1].length > 1 ? values[1] : "0" + values[1];
        var month = values[0].length > 1 ? values[0] : "0" + values[0];
        var year = values[2];
        return year + "/" + month + "/" + day;
    }
    return "N/A";
}

/**
 * Sorts entries by date then title.
 *
 * @param e1  Entry 1 to be compared.
 * @param e2  Entry 2 to be compared.
 * @return whether greater, less than, or equal to.
 */
function sortEntries(e1, e2)
{
    if (e1[1] === e2[1])
    {
        if (e1[0] === e2[0])
        {
            return 0;
        }
        return e2[0] > e1[0] ? 1 : -1;
    }
    return e2[1] > e1[1] ? 1 : -1;
}
