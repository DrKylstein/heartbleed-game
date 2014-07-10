var view_module = (function(){
    var module = {};
        
    function MemoryView(id) {
        this.onSelection = function(index) {
            console.warn("Unset Memoryview.onSelection called: "+index)};
        this.m_rootElement = $(id);
    }
    
    module.MemoryView = MemoryView;
    
    return module;
}();