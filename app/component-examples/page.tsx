import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockSessions } from "@/lib/mock-data";

export default function ComponentExamples() {
  return (
    <div className="h-full w-full flex flex-col gap-4 items-start justify-start bg-bg0">
      <div className="flex flex-col gap-2 bg-bg1 border-b p-4 w-full">
        <h1 className="text-xl font-bold">Component Examples</h1>
        <p className="text-fg2 text-sm">
          Core components used to build and iterate on prototypes faster. See
          the Bites & Bytes repo for production components.
        </p>
      </div>
      {/* Button section */}
      <div className="flex flex-col gap-4 w-full p-4">
        <h2 className="text-lg font-bold">Button</h2>
        <Separator />
        <div className="flex flex-row gap-2">
          <Button variant="primary">Primary button</Button>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="outline">Outline button</Button>
          <Button variant="ghost">Ghost button</Button>
          <Button variant="destructive">Destructive button</Button>
        </div>
      </div>
      {/* Input section */}
      <div className="flex flex-col gap-4 w-full p-4">
        <h2 className="text-lg font-bold">Input</h2>
        <Separator />
        <Input placeholder="Input" />
        <Textarea placeholder="Textarea" />
      </div>
      {/* Select section */}
      <div className="flex flex-col gap-4 w-full p-4">
        <h2 className="text-lg font-bold">Select</h2>
        <Separator />
        <Select variant="primary" size="md">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Dialog section */}
      <div className="flex flex-col gap-4 w-full p-4">
        <h2 className="text-lg font-bold">Dialog</h2>
        <Separator />
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>Dialog Description</DialogDescription> 
            </DialogHeader>
            <div className="flex flex-col gap-4 p-4">
              <Input placeholder="Input" />
              <Textarea placeholder="Textarea" />
            </div>
            <DialogFooter>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* Table section */}
      <div className="flex flex-col gap-4 w-full p-4">
        <h2 className="text-lg font-bold">Table</h2>
        <Separator />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Session ID</TableHead>
              <TableHead>Room name</TableHead>
              <TableHead>Started at</TableHead>
              <TableHead>Ended at</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSessions.map((session) => (
              <TableRow key={session.sessionId}>
                <TableCell className="font-mono text-xs">{session.sessionId}</TableCell>
                <TableCell className="font-mono text-xs">{session.roomName}</TableCell>
                <TableCell>{session.startedAt}</TableCell>
                <TableCell>{session.endedAt}</TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>{session.participants}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="gap-1">
                    {session.features}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {session.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
