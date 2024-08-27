import { NextFunction, Request, Response } from "express";
import ExcelJS from "exceljs";
import { getBBSByIdAction } from "../../actions/BBS/getBBSByIdAction";

export const getBBSByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    // Validate the ID
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // Fetch the BBS record
    const result = await getBBSByIdAction(id);

    if (result.status !== 200) {
      return res.status(result.status).send(result);
    }

    const bbsRecord = result.data;

    // Ensure bbsRecord is not undefined before proceeding
    if (!bbsRecord) {
      return res.status(404).json({ error: "BBS record not found" });
    }

    // Create an Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("BBS Record");

    // Add columns and rows

    worksheet.columns = [
      { header: "Field", key: "field", width: 30 },
      { header: "Value", key: "value", width: 50 },
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4F81BD" },
    };
    worksheet.getRow(1).alignment = { horizontal: "center" };

    // Add the data to the Excel file
    Object.entries(bbsRecord).forEach(([key, value]) => {
      worksheet.addRow({ field: key, value: value });
    });

    // Set borders
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
      });
    });

    // Set column widths
    worksheet.getColumn("field").width = 30;
    worksheet.getColumn("value").width = 50;

    // Wrap text
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { wrapText: true };
      });
    });

    // Write to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Set headers and send the file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=bbs_record_${id}.xlsx`
    );

    res.send(buffer);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
