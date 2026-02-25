// Column variables
let num_col = 0;
let date_col = 1;
let payee_col = 2;
let amount_col = 3;
let account_col = 4;
let secret_account_col = 5;
let desc_col = 6;
let tags_col = 7;

// To keep track of which groups are collapsed
let collapsedGroups = {};

// To render row at the start of a group, and handle collapsing
function summaryRow(rows, group, level) {

    // Find out if group is collapsed
    var collapsed = !!collapsedGroups[group];
    console.log(collapsed)

    // If group is collapsed, display it as collapsed
    rows.nodes().each(function (r) {
        r.style.display = collapsed ? 'none' : '';
        //r.style.display ='none';
    });  

    // Construct summary row
    var data = rows.data();
    var info_row = document.createElement("tr");
    const info = [data[0][0], data[1][1], data[0][2], data[0][3], data[0][4], data[0][6], data[0][7]];
    for (i=0; i<info.length; i++) {
        var cell = document.createElement("th");
        cell.textContent = info[i];
        info_row.appendChild(cell);
    }
    info_row.setAttribute("data-name", group);
    
    return info_row;
}

// Handler for clicking on the row to collapse/expand it
 $('#rc_table tbody').on('click', "tr", function () {
    var name = $(this).data('name');
    console.log("yes")
    collapsedGroups[name] = !collapsedGroups[name];
    table.draw();
});

// Initialiase DataTable
let table = new DataTable("#rc_table", {
    //responsive: true,
    //rowGroup: {
    //    dataSrc: num_col,
    //    startRender: summaryRow
    //},
    //order: [[date_col, 'desc']],
    columnDefs: [
    //    { visible: true, targets: [secret_account_col, num_col] },
        { data: function (row, type, val, meta) {
            console.log(String(val).split(", "))
            return String(val).split(", ");
        },
          targets: [tags_col]
        },
    //    { render: (data, type, row) => "£" + data, targets: amount_col },
        //{ render: {
        //    _: '[, ].name',
        //    sp: '[].name'
        //},
        //  targets: [tags_col]
        //},
    //    { searchPanes: {
    //        show: false
    //        },
    //        targets: [num_col, date_col, account_col, amount_col, desc_col]
    //    },
    //    { searchPanes: {
    //        header: "Account",
    //        },
    //        targets: [secret_account_col]
    //    }
    ],
    //lengthMenu: [25, 50, 100, -1],
    layout: {
        top1: {
            searchPanes: {
                orthogonal: "sp",
                dtOpts: {
                    select: {
                        style: 'multi'
                    }
                },
                cascadePanes: true,
                order: ["Payee", "Tags", "SecretAccounts"],
            }
        }
    }
});