({
    resetData : function(cmp) {
        cmp.find('field').forEach(function(f) {
            f.reset();
        });
    }
})