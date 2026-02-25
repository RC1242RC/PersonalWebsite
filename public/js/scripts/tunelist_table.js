// Initialise DataTable
let tunelist_table = new DataTable("#tunelist_table", {
    //responsive: true,
    //rowGroup: {
    //    dataSrc: num_col,
    //    startRender: summaryRow
    //},
    //order: [[date_col, 'desc']],
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
    //lengthMenu: [25, 50, 100, -1],
    scrollX: true,
    columnDefs: [
        {
            targets: [3, 6, 7],
            visible: false
        },
    ],
    select: {
        style: 'single',
        toggleable: false
    },
    layout: {
        top1: {
            searchPanes: {
                cascadePanes: false,
                viewTotal: true,
                layout: "columns-4",
                threshold: 1,
                order: ["Type", "Time", "Key", "Composer"],
                controls: false,
                collapse: false,
                clear: true,
                dtOpts: {
                    scrollY: '100px',
                    select: {
                        style: "multi"
                    }
                }
            }
        }
    }
});

// Handle when tune is clicked
tunelist_table.on('select', function (e, dt, type, index) {
    if (type === 'row') {
        var data = tunelist_table
            .row(index)
            .data();
        
        var abc_note_string = data[7].split('\\n').join('\n');
        var abc_total_string = `X:1\nT:${data[0]}\nC:${data[5]}\nM:${data[2]}\nR:${data[1]}\nL:${data[3]}\nS:${data[6]}\nK:${data[4]}\n${abc_note_string}`;
 
        ABCJS.renderAbc(
            "paper1", 
            abc_total_string,
            {
                selectionColor: "ff0000",
                responsive: "resize"
            })
    }
});

// Preselect tune
tunelist_table.row(0).select();