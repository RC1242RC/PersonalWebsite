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
    select: {
        style: 'single',
        toggleable: false
    },
    layout: {
        top1: {
            searchPanes: {
                cascadePanes: true,
                threshold: 1,
                order: ["Type", "Key"],
                controls: false,
                collapse: false,
                clear: true,
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
        var abc_total_string = `X:1\nT:${data[4]}\nC:${data[5]}\nM:${data[1]}\nR:${data[0]}\nL:${data[2]}\nS:${data[6]}\nK:${data[3]}\n${abc_note_string}`;
 
        ABCJS.renderAbc("paper1", abc_total_string)
    }
});