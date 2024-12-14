package com.xa8bit.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xa8bit.dao.IDictDao;
import com.xa8bit.dao.ISchemeDao;
import com.xa8bit.domain.Dict;
import com.xa8bit.domain.Scheme;
import com.xa8bit.domain.TreeVo;
import com.xa8bit.service.IDictService;
import com.xa8bit.utils.TreeUtils;
import com.xa8bit.utils.UUIDUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DictServiceImpl implements IDictService {

    @Resource
    private IDictDao dictDao;

    @Resource
    private ISchemeDao schemeDao;

    @Override
    public JSONObject getDictsForTreeBySchemeIdAndLevelForCascader(Map<String, Object> params) {
        List<Dict> dictsForTree = dictDao.getDictsForTreeBySchemeIdAndLevelForCascader(params);
        if(dictsForTree.isEmpty()) {
            return new JSONObject();
        }
        //将查询结果重新封装到TreeVo中
        ArrayList<TreeVo> treeVos = new ArrayList<>();
        dictsForTree.stream().forEach( dict -> {
            TreeVo treeVo = new TreeVo();
            treeVo.setId(dict.getId());
            treeVo.setParentId(dict.getParentId());
            treeVo.set_$1(dict.getDictCode());
            treeVo.set_$2(dict.getDictName());
            treeVos.add(treeVo);
        });
        //使用TreeUtils将查询结果封装生ListTree形式
        List<TreeVo> listTree = TreeUtils.transferListToListTree(treeVos,dictsForTree.get(0).getParentId());
        return transferListTreeToJsonForCascader(listTree.get(0));
    }

    @Override
    public JSONObject getDictsForTreeBySchemeIdForTree(String schemeId) {
        //从数据库中查询该方案下所有字典类型配置
        List<Dict> dictsForTree = dictDao.getDictsForTreeBySchemeIdForTree(schemeId);
        //如果查询到的数据只有0条，说明该方案下没有任何字典类型数据，需要初始化树结构
        if(dictsForTree.isEmpty()) {
            //获取方案名称
            Scheme scheme = schemeDao.getSchemeBySchemeId(schemeId);
            //构造该方案 根节点
            Dict schemeParentNode = Dict.builder()
                    .dictName(scheme.getSchemeName() + "字典")
                    .dictCode(UUIDUtils.randomUUID())
                    .dictSort(1)
                    .dictData("字典数据")
                    .dictDesc(scheme.getSchemeName() + "字典父节点")
                    .dictStatus("0")
                    .parentId(0)
                    .level(0)
                    .schemeId(schemeId)
                    .build();
            //持久化该方案 根节点 到数据库
            dictDao.addDict(schemeParentNode);

            //构造该方案 根节点->基础元素
            Dict basciElementNode = Dict.builder()
                    .dictName("基础元素")
                    .dictCode(UUIDUtils.randomUUID())
                    .dictSort(1)
                    .dictData("基础元素")
                    .dictDesc("基础元素")
                    .dictStatus("0")
                    .parentId(schemeParentNode.getId())
                    .level(1)
                    .schemeId(schemeId)
                    .build();
            //持久化该方案 根节点->基础元素 到数据库
            dictDao.addDict(basciElementNode);

            //构造该方案 根节点->高级元素
            Dict seniorElementNode = Dict.builder()
                    .dictName("高级元素")
                    .dictCode(UUIDUtils.randomUUID())
                    .dictSort(2)
                    .dictData("高级元素")
                    .dictDesc("高级元素")
                    .dictStatus("0")
                    .parentId(schemeParentNode.getId())
                    .level(1)
                    .schemeId(schemeId)
                    .build();
            //持久化该方案 根节点->高级元素 到数据库
            dictDao.addDict(seniorElementNode);

            //构造该方案 根节点->高级元素->自定算法
            Dict customAlgorithmElementNode = Dict.builder()
                    .dictName("自定算法")
                    .dictCode(UUIDUtils.randomUUID())
                    .dictSort(1)
                    .dictDesc("自定算法")
                    .dictStatus("0")
                    .parentId(seniorElementNode.getId())
                    .level(2)
                    .schemeId(schemeId)
                    .build();
            //持久化该方案 根节点->高级元素->自定算法 到数据库
            dictDao.addDict(customAlgorithmElementNode);

            //构造该方案 根节点->高级元素->自定算法->随机数算法
            Dict randomAlgorithmElementNode = Dict.builder()
                    .dictName("随机数算法")
                    .dictData("RANDOM_NUMBER_ALGORITHM")
                    .dictCode(UUIDUtils.randomUUID())
                    .dictSort(1)
                    .dictDesc("随机数算法")
                    .dictStatus("0")
                    .parentId(customAlgorithmElementNode.getId())
                    .level(3)
                    .schemeId(schemeId)
                    .build();
            //持久化该方案 根节点->高级元素->自定算法->随机数算法 到数据库
            dictDao.addDict(randomAlgorithmElementNode);
        }

        //插入父节点数据后再次从数据库中查询该方案下所有字典类型配置
        dictsForTree = dictDao.getDictsForTreeBySchemeIdForTree(schemeId);
        //将查询结果重新封装到TreeVo中
        ArrayList<TreeVo> treeVos = new ArrayList<>();
        dictsForTree.stream().forEach( dict -> {
            TreeVo treeVo = new TreeVo();
            treeVo.setId(dict.getId());
            treeVo.setParentId(dict.getParentId());
            treeVo.set_$1(dict.getDictName());
            treeVo.set_$2(dict.getDictData());
            treeVo.set_$3(dict.getDictDesc());
            treeVo.set_$4(dict.getDictStatus());
            treeVo.setLevel(dict.getLevel());
            treeVos.add(treeVo);
        });
        List<TreeVo>  listTree = TreeUtils.transferListToListTree(treeVos,dictsForTree.get(0).getParentId());
        return transferListTreeToJsonForTree(listTree.get(0));
    }


    @Override
    public int addDict(Dict dict) {
        //设置dictCode
        dict.setDictCode(UUIDUtils.randomUUID());
        //设置字典启用状态
        dict.setDictStatus(dict.getDictStatus() == "true" ? "0" : "1");
        dictDao.addDict(dict);
        return dict.getId();
    }

    @Override
    public int deleteDictByIdRecursive(int id) {
        return dictDao.deleteDictByIdRecursive(id);
    }

    @Override
    public List<Dict> getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode(Map params) {
        return dictDao.getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode(params);
    }

    @Override
    public int updateDict(Dict dict) {
        //设置字典启用状态
        dict.setDictStatus(dict.getDictStatus() == "true" ? "0" : "1");
        dictDao.updateDict(dict);
        return dict.getId();
    }

    /**
     * 将ListTree转换成指定格式的json
     * @param node
     * @return
     */
    public JSONObject transferListTreeToJsonForCascader(TreeVo node) {
        JSONObject treeJO = new JSONObject();
        treeJO.put("value", node.get_$1());
        treeJO.put("label", node.get_$2());
        if (node.getChildren() != null && node.getChildren().size() > 0) {
            JSONArray jsonArray = new JSONArray();
            for (TreeVo child : node.getChildren()) {
                jsonArray.add(transferListTreeToJsonForCascader(child));
            }
            treeJO.put("children", jsonArray);
        } else {
            treeJO.put("children", null);
        }
        return treeJO;
    }

    /**
     * 将ListTree转换成指定格式的json
     * @param node
     * @return
     */
    public JSONObject transferListTreeToJsonForTree(TreeVo node) {
        JSONObject treeJO = new JSONObject();
        treeJO.put("id", node.getId());
        treeJO.put("label", node.get_$1());
        treeJO.put("data", node.get_$2());
        treeJO.put("desc", node.get_$3());
        treeJO.put("status", node.get_$4());
        treeJO.put("level", node.getLevel());
        if (node.getChildren() != null && node.getChildren().size() > 0) {
            JSONArray jsonArray = new JSONArray();
            for (TreeVo child : node.getChildren()) {
                jsonArray.add(transferListTreeToJsonForTree(child));
            }
            treeJO.put("children", jsonArray);
        } else {
            treeJO.put("children", null);
        }
        return treeJO;
    }
}
