package com.xa8bit.controller;

import com.alibaba.fastjson.JSONObject;
import com.xa8bit.domain.Dict;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.service.IDictService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DictController {

    @Resource
    IDictService dictService;

    /**
     * 根据level查询字典需要用到的数据
     * @param level 树的层级
     * @return
     */
    @GetMapping("/dict/scheme_id/{scheme_id}/level/{level}")
    public ResponseMessage<JSONObject> getDictsForTreeBySchemeIdAndLevelForCascader(@PathVariable("scheme_id") String schemeId,
                                                                  @PathVariable("level") int level) {
        Map<String, Object> params = new HashMap<>();
        params.put("schemeId",schemeId);
        params.put("level",level);
        return ResponseMessage.success(dictService.getDictsForTreeBySchemeIdAndLevelForCascader(params));
    }

    /**
     * 根据level查询字典需要用到的数据
     * @param schemeId 方案id
     * @return
     */
    @GetMapping("/dict/scheme_id/{scheme_id}")
    public ResponseMessage<JSONObject> getDictsForTreeBySchemeIdForTree(@PathVariable("scheme_id") String schemeId) {
        return ResponseMessage.success(dictService.getDictsForTreeBySchemeIdForTree(schemeId));
    }

    /**
     * 新增Dict
     * @param dict
     * @return
     */
    @PostMapping("/dict")
    public ResponseMessage<Dict> addDict(@RequestBody Dict dict) {
        int addDictId = dictService.addDict(dict);
        Dict dictForReponse = new Dict();
        dictForReponse.setId(addDictId);
        return ResponseMessage.success(dictForReponse);
    }

    /**
     * 根据id删除Dict
     * @param id
     * @return
     */
    @DeleteMapping("/dict/recursive/{id}")
    public ResponseMessage<String> deleteDictByIdRecursive(@PathVariable("id") int id) {
        int row = dictService.deleteDictByIdRecursive(id);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 根据level和DictCode查询字典需要用到的数据
     * @param dictCode 字典代码
     * @return
     */
    @GetMapping("/dict/scheme_id/{scheme_id}/dict_code/{dict_code}")
    public ResponseMessage<List<Dict>> getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode(@PathVariable("scheme_id") String schemeId,
            @PathVariable("dict_code") String dictCode) {
        HashMap<String, String> params = new HashMap<>();
        params.put("schemeId",schemeId);
        params.put("dictCode",dictCode);
        return ResponseMessage.success(dictService.getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode(params));
    }

    /**
     * 更新Dict
     * @param dict
     * @return
     */
    @PutMapping("/dict")
    public ResponseMessage<Dict> updateDict(@RequestBody Dict dict) {
        int updateDictId = dictService.updateDict(dict);
        Dict updateDictResponse = new Dict();
        updateDictResponse.setId(updateDictId);
        return ResponseMessage.success(updateDictResponse);
    }
}
