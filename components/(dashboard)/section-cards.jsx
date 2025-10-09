"use client"

import {
  IconArrowUpRight,
  IconCircleCheckFilled,
  IconTrendingDown,
  IconTrendingUp,
  IconUsers,
  IconExclamationCircleFilled
} from "@tabler/icons-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export function SectionCards({ userData }) {
  const t = useTranslations('section-cards');

  return (
    <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-2 lg:px-6">

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl text-textGreen font-semibold font-playfair">
            {t("helloUser", { name: userData.user.firstname })}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-start space-y-6">
            <p className="text-xm text-textGreen font-montserrat">
              {t("latestTransactions")}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg text-textGreen font-medium font-roboto">
            Bilsa {userData.account.plan}
          </CardTitle>

          <div className="flex flex-row gap-2 items-center py-2">
            {userData.account.statut === "active"
              ? (<IconCircleCheckFilled className="fill-green-500" size={16} />)
              : (<IconExclamationCircleFilled className="text-red-600" size={16} />)}
            <span className="text-xs text-textGreen">{userData.account.statut}</span>
          </div>

        </CardHeader>
        <hr className="border-goldButton" />
        <CardContent>
          <div className="flex flex-col space-y-3 items-start">
            <div className="text-textGreen text-xl font-montserrat font-semibold">
              {t("balance")} : <span className="font-medium">{` ${userData.account.currency} ${userData.account.balance}`}</span>
            </div>
            <div className="text-textGreen text-lg font-montserrat font-semibold md:text-xl">
              {t("iban")} : <span className="font-medium">{` ${userData.account.iban}`}</span>
            </div>
            <div className="text-textGreen text-lg font-montserrat font-semibold md:text-xl">
              {t("accountNumber")} : <span className="font-medium">{` ${userData.account.accountNumber}`}</span>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
