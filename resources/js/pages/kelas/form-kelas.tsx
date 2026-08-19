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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { kelasAPI } from './type';
import kelas from '@/routes/kelas';
import { useState } from 'react';
type FormInputProps = {
    onSuccess: () => void;
};

export default function FormKelas() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Kelas
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Tambah Data Kelas
                    </DialogTitle>
                </DialogHeader>
                <FormInput onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

function FormInput({ onSuccess }: FormInputProps) {
    const dataApi = usePage<{ data: kelasAPI }>().props.data;
    const { data, setData, post, errors, reset, processing } = useForm({
        jurusan: '',
        rombel: '',
        tingkatan: '',
    });
    const handleSubmit = () => {
        post(kelas.store().url, {
            onSuccess: () => {
                reset();
                onSuccess();
            },
        });
    };

    if (dataApi.DJurusan.length === 0) {
        return (
            <h2 className="text-center text-2xl">Data Jurusan Belum Ada!</h2>
        );
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <FieldGroup>
                <Field tabIndex={1}>
                    <FieldLabel>Jurusan</FieldLabel>
                    {errors.jurusan && (
                        <FieldError>{errors.jurusan}</FieldError>
                    )}
                    <Select
                        value={data.jurusan}
                        onValueChange={(e) => setData('jurusan', e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {dataApi.DJurusan.map((item) => (
                                    <SelectItem
                                        value={String(item.id)}
                                        key={item.singkatan}
                                    >
                                        {item.nama} ({item.singkatan})
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field tabIndex={2}>
                    <FieldLabel htmlFor="Rombel">Rombel</FieldLabel>
                    {errors.rombel && <FieldError>{errors.rombel}</FieldError>}
                    <Input
                        id="rombel"
                        type="text"
                        placeholder="Contoh: 1 atau A"
                        value={data.rombel}
                        onChange={(e) => setData('rombel', e.target.value)}
                    />
                </Field>
                <Field tabIndex={3}>
                    <FieldLabel>Tingkatan</FieldLabel>
                    {errors.tingkatan && (
                        <FieldError>{errors.tingkatan}</FieldError>
                    )}
                    <Select
                        value={data.tingkatan}
                        onValueChange={(e) => setData('tingkatan', e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Tingkatan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="11">11</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field
                    orientation="horizontal"
                    className="justify-end"
                    tabIndex={4}
                >
                    <Button type="submit">Tambahkan</Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
