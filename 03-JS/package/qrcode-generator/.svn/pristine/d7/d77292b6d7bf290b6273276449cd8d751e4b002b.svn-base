package com.xa8bit.controller;

import com.xa8bit.domain.ResponseMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
public class GeneratorQrcodeController {

    /**
     * 上传文件
     * @param multipartFile 文件信息
     * @param session
     * @return
     * @throws IOException
     */
    @PostMapping("/upload")
    public ResponseMessage<Map<String,String>> uploadFile(@RequestParam("uploadFile") MultipartFile multipartFile, HttpSession session) throws IOException {
        System.out.println(multipartFile.getBytes().length);
        /*
        //1.获取上传的文件的文件名,主要是用来确定文件的后缀
        String fileName = multipartFile.getOriginalFilename();
        //2.处理文件重名问题,从最后一个"."开始截取直到最后就是上传文件的后缀名,
        String fileNameSuffix = fileName.substring(fileName.lastIndexOf("."));
        log.info("文件名后缀: " + fileNameSuffix);
        //3.使用java.util包下的UUID生成随机值的工具类
        fileName = (UUID.randomUUID().toString()).replaceAll("-","") + fileNameSuffix;
        log.info(fileName);
        //4.设置文件上传的位置比如服务器中的upload目录,这个目录如果不存在我们还需要创建一个
        ServletContext servletContext = session.getServletContext();
        String uploadDirRealPath = servletContext.getRealPath("upload");
        File uploadDir = new File(uploadDirRealPath);
        if(!uploadDir.exists()){
            uploadDir.mkdir();
        }
        //5.获取文件最终在服务器中的位置
        String fileDestRealPath = uploadDir + File.separator + fileName;
        //6.实现上传功能(本质是文件的复制,先读后写),将MultipartFile中封装的文件数据转移到最终的文件位置
        //FileUtils.copyInputStreamToFile(uploadFile.getInputStream(),new File(fileDestRealPath));
        */
        //获取当前操作的ElementPlus上传组件的索引
        Map<String, String> responseMap = new HashMap<>();
        return ResponseMessage.success(responseMap);
    }
}
