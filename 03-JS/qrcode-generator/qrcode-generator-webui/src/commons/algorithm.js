//所有的自定义算法配置在这里
export const CUSTOM_ALGORITHM = {
    //上海松江燃气全部自定义算法
    RANDOM_NUMBER: function(previousCurrentBatchGenerateBarCodeValueFieldList) {
        //return Math.floor(Math.random() * 10) + 1
        return 'CA1'
    }
}