using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace PS_motPress.Conexion
{
    public class ClsFunciones
    {
        public string PropIsNullOrEmpty(string pValor, string PvalorPropuesto = "")
        {
            if (String.IsNullOrEmpty(pValor))
            { return PvalorPropuesto; }
            else
            { return pValor; }
        }

        public bool isInt32(String num)
        {
            try
            {
                Int32.Parse(num);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public bool IsDouble(string num)
        {
            double mNum = 0;

            try
            {
                if (Double.TryParse(num, out mNum))
                {
                    return true;
                }
                else { return false; }
            }
            catch
            {

                return false;

            }
        }
        public double CalcCuota(string mMonto, string pInteres, string pPlan)
        {
            double calc = 0;
            try
            {

                calc = ((Convert.ToDouble(mMonto) * (Convert.ToDouble(pInteres) * Convert.ToDouble(pPlan)) / Convert.ToDouble(100)) + Convert.ToDouble(mMonto)) / Convert.ToDouble(pPlan);
                return calc;
            }
            catch
            {
                return 0;
            }



        }

        public string PuntoDecimal()
        {
            NumberFormatInfo nfi = System.Globalization.CultureInfo.CurrentCulture.NumberFormat;

            return nfi.NumberDecimalSeparator;
        }
        public string SeparadordeMiles()
        {
            NumberFormatInfo nfi = System.Globalization.CultureInfo.CurrentCulture.NumberFormat;
            return nfi.NumberGroupSeparator;
        }

        public string ReemplazoComaDecimal(string mImporte)
        {


            return mImporte.Replace(".", PuntoDecimal()).Replace(".", PuntoDecimal());


        }

        public double CalcTotalCuota(string mMonto, string pInteres, string pPlan)
        {
            double calc = 0;
            try
            {
                /// Convert.ToDouble(pPlan)
                calc = ((Convert.ToDouble(mMonto) * (Convert.ToDouble(pInteres) * Convert.ToDouble(pPlan)) / Convert.ToDouble(100)) + Convert.ToDouble(mMonto));
                return calc;
            }
            catch
            {
                return 0;
            }



        }
        public double CalcTotalFinanciado(string mMonto, string pInteres, string pPlan)
        {
            double calc = 0;
            try
            {
                /// Convert.ToDouble(pPlan)
                calc = ((Convert.ToDouble(mMonto) * (Convert.ToDouble(pInteres) * Convert.ToDouble(pPlan)) / Convert.ToDouble(100)) + Convert.ToDouble(mMonto));
                return calc;
            }
            catch
            {
                return 0;
            }



        }

        public double CalcTotalInteres(string mMonto, string pInteres, string pPlan)
        {
            double calc = 0;
            try
            {
                /// Convert.ToDouble(pPlan)
                calc = ((Convert.ToDouble(mMonto) * Convert.ToDouble(pInteres) * Convert.ToDouble(pPlan) / Convert.ToDouble(100)));
                return calc;
            }
            catch
            {
                return 0;
            }



        }
        public bool IsNumeric(object Expression)
        {
            bool isNum;
            double retNum;

            isNum = Double.TryParse(Convert.ToString(Expression), System.Globalization.NumberStyles.Any, System.Globalization.NumberFormatInfo.InvariantInfo, out retNum);
            return isNum;
        }
        public object IsNumericDev(string Expression)
        {
            bool isNum;
            double retNum;

            isNum = Double.TryParse(Convert.ToString(Expression), out retNum);
            if (isNum)
            {
                return isNum;
            }
            else
            {
                return 0;
            }
        }

        public Double IsToDoubleDev(string Expression)
        {
            bool isNum;
            double retNum;

            isNum = Double.TryParse(Expression, out retNum);
            if (isNum)
            {
                return retNum;
            }
            else
            {
                return 0;
            }
        }

        public Int32 IsToInt32Dev(string Expression)
        {
            bool isNum;
            Int32 retNum;

            isNum = Int32.TryParse(Expression, out retNum);
            if (isNum)
            {
                return retNum;
            }
            else
            {
                return 0;
            }
        }
        public Decimal IsToDecimalDev(string Expression)
        {
            bool isNum;
            Decimal retNum;

            isNum = Decimal.TryParse(Expression, out retNum);
            if (isNum)
            {
                return retNum;
            }
            else
            {
                return 0;
            }
        }

        public string IsNull(string Cad, string schar)
        {
            if (Cad == null || Cad.Length == 0)
            {
                return schar;
            }
            else
            {
                return Cad;
            }
        }


        public string cChange(string Expression, int cCan)
        {
            bool isNum;
            double retNum;

            isNum = Double.TryParse(Convert.ToString(Expression), System.Globalization.NumberStyles.Any, System.Globalization.NumberFormatInfo.CurrentInfo, out retNum);


            if (retNum < 0 || retNum > 0)
            {
                return decimal.Parse(retNum.ToString()).ToString("N" + cCan);
            }
            else
            {
                return "";
            }
        }
        public bool IsDate(string inputdate)
        {

            bool isDate = true;

            try
            {

                DateTime dt = DateTime.Parse(inputdate);
            }
            catch
            {
                isDate = false;
            }
            return isDate;
        }
        public string cConvertPointComa(string expression)
        {
            return expression.Replace(".", ",");

        }
    }
}