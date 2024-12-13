package com.xa8bit.utils;

import com.xa8bit.domain.TreeVo;

import java.util.ArrayList;
import java.util.List;

public class TreeUtils {

    /**
     * 将List转换为ListTree
     * @param tree  树
     * @param searchParentId 查询时的父id
     * @return
     */
    public static List<TreeVo> transferListToListTree(List<TreeVo> tree,int searchParentId) {
        List<TreeVo> listTree = new ArrayList<>();
        for (TreeVo parentNode : tree) {
            int parentId = parentNode.getParentId();
            if (parentId == searchParentId) {
                // 是父级
                listTree.add(findChildren(parentNode, tree));
            }
        }
        return listTree;
    }

    /**
     * 递归查找Tree中的子节点
     * @param parentNode
     * @param tree
     * @return
     */
    private static TreeVo findChildren(TreeVo parentNode, List<TreeVo> tree) {
        for (TreeVo childNode : tree) {
            if (parentNode.getId() == childNode.getParentId()) {
                if (parentNode.getChildren() == null) {
                    parentNode.setChildren(new ArrayList<>());
                }
                parentNode.getChildren().add(findChildren(childNode, tree));
            }
        }
        return parentNode;
    }
}
