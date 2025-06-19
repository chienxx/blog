public void upload(CustomerInOutTmp model) {
    File tempFile = null;
    Sftp sftp = null;
    
    try {
        // 1. 准备文件信息
        String operationDate = StringUtils.isEmpty(model.getOpTime()) 
            ? DateUtil.format(new Date(), DatePattern.NORM_DATE_FORMAT) 
            : model.getOpTime();
        String fileName = IDC_CUSTOMER_IN_OUT_NAME + "_" + operationDate;
        
        // 2. 创建临时Excel文件
        tempFile = File.createTempFile(fileName, ExcelTypeEnum.XLSX.getValue());
        
        // 3. 查询数据
        IdcCustomerInOutStatistic queryCondition = new IdcCustomerInOutStatistic();
        queryCondition.setPageSize(PageConstant.SIZE_INFINITE);
        queryCondition.setDateType(DateTypeEnum.DAY.getCode());
        queryCondition.setOpTime(operationDate);
        
        List<IdcCustomerInOutStatistic> dataRecords = idcService.page(queryCondition).getResults();
        
        // 4. 写入Excel文件
        ExcelWriter excelWriter = null;
        try {
            excelWriter = EasyExcel.write(tempFile, IdcCustomerInOutStatistic.class)
                .excelType(ExcelTypeEnum.XLSX)
                .head(IdcCustomerInOutStatistic.class)
                .build();
                
            WriteSheet writeSheet = EasyExcel.writerSheet().build();
            writeSheet.setAutomaticMergeHead(true);
            
            if (CollectionUtils.isEmpty(dataRecords)) {
                log.warn("未查询到IDC客户流入流出流量数据，生成空文件");
                excelWriter.write(List.of(), writeSheet);
            } else {
                excelWriter.write(dataRecords, writeSheet);
                log.info("成功写入{}条记录到Excel文件", dataRecords.size());
            }
        } finally {
            if (excelWriter != null) {
                excelWriter.finish();
            }
        }
        
        // 5. 上传到SFTP服务器
        sftp = new Sftp(JschUtil.openSession(host, port, username, password));
        String remotePath = uploadPath + File.separator + fileName.replace("-", "");
        sftp.put(tempFile.getAbsolutePath(), remotePath);
        log.info("文件已成功上传到SFTP服务器: {}", remotePath);
        
    } catch (Exception e) {
        log.error("上传IDC客户流入流出流量数据失败", e);
        throw new RuntimeException("文件上传处理失败", e);
    } finally {
        // 6. 清理资源
        if (sftp != null) {
            try {
                sftp.close();
            } catch (Exception e) {
                log.warn("关闭SFTP连接时发生异常", e);
            }
        }
        
        if (tempFile != null && tempFile.exists()) {
            try {
                FileUtil.del(tempFile);
                log.debug("临时文件已删除: {}", tempFile.getAbsolutePath());
            } catch (Exception e) {
                log.warn("删除临时文件时发生异常: {}", tempFile.getAbsolutePath(), e);
            }
        }
    }
} 