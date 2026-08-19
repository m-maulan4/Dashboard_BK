import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import jurusan from '@/routes/jurusan';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
type FormInputProps = {
    onSuccess: () => void;
};

export default function FormJurusan() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Jurusan
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Tambah Data Jurusan
                    </DialogTitle>
                </DialogHeader>
                <FormInput onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
function FormInput({ onSuccess }: FormInputProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        nama: '',
        singkatan: '',
    });
    const handleSubmit = () => {
        post(jurusan.store().url, {
            onSuccess: () => {
                reset();
                onSuccess();
            },
        });
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <FieldGroup>
                <Field tabIndex={1}>
                    <FieldLabel htmlFor="Nama Jurusan">Nama Jurusan</FieldLabel>
                    {errors.nama && <FieldError>{errors.nama}</FieldError>}
                    <Input
                        type="text"
                        placeholder="Contoh: Matematika"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                    />
                </Field>
                <Field tabIndex={2}>
                    <FieldLabel htmlFor="Singkatan">Singkatan</FieldLabel>
                    {errors.singkatan && (
                        <FieldError>{errors.singkatan}</FieldError>
                    )}
                    <Input
                        type="text"
                        placeholder="Contoh: MTK"
                        value={data.singkatan}
                        onChange={(e) => setData('singkatan', e.target.value)}
                    />
                </Field>
                <Field
                    orientation="horizontal"
                    className="justify-end"
                    tabIndex={3}
                >
                    <Button type="submit">Tambahkan</Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
