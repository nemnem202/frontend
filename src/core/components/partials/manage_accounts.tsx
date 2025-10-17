import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { Account } from "@/types/tables/accounts";
import { ApiService } from "@/services/api_service";
import { errorToastProps, successToastProps } from "@/config/display/toasterProps";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Response } from "@/types/general/response";

export default function ManageAccount({
  accounts,
  title,
  get_all,
}: {
  accounts: Account[];
  title: string;
  get_all: () => void;
}) {
  const changeStatus = async (account_id: number, suspended: boolean) => {
    try {
      const headers = ApiService.create_header({ "Content-type": "application/json" });
      const response = await ApiService.post(
        { suspended: suspended },
        headers,
        "/account/suspend/" + account_id
      );

      toast(response.message, response.success ? successToastProps : errorToastProps);
      get_all();
    } catch (err) {
      toast("an error occurred", errorToastProps);
    }
  };

  const promote = async (account_id: number) => {
    const res = await ApiService.get<Response>(new Headers(), "/account/vendor/" + account_id);

    toast(res.message, res.success ? successToastProps : errorToastProps);

    res.success ?? get_all();
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title.toLowerCase()}>
        <AccordionTrigger className="cursor-pointer text-lg hover:underline">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="overflow-x-auto">
            <Table className="w-full border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%] px-4 py-2">Username</TableHead>
                  <TableHead className="w-[25%] text-center px-4 py-2">Reports</TableHead>
                  <TableHead className="w-[25%] text-center px-4 py-2">Status</TableHead>
                  {title.toLowerCase() === "users" ? (
                    <TableHead className="w-[25%] text-right px-4 py-2">Promotion</TableHead>
                  ) : (
                    <TableHead className="w-[25%] text-right px-4 py-2"></TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts
                  .sort((a, b) => a.id - b.id)
                  .map((a, idx) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium px-4 py-2">{a.username}</TableCell>
                      <TableCell className="text-center px-4 py-2">{a.number_of_reports}</TableCell>
                      <TableCell className="text-center px-4 py-2">
                        {!a.suspended ? (
                          <Button className="w-24" onClick={() => changeStatus(a.id, true)}>
                            Active
                          </Button>
                        ) : (
                          <Button
                            className="w-24"
                            variant="destructive"
                            onClick={() => changeStatus(a.id, false)}
                          >
                            Suspended
                          </Button>
                        )}
                      </TableCell>
                      {title.toLowerCase() === "users" && (
                        <TableCell className="text-right px-4 py-2">
                          <Button onClick={() => promote(a.id)}>Promote</Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
